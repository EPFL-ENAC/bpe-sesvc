import { CouchUser, GUEST_NAME } from "@/store/UserModule";
import { VueConstructor } from "vue";
import { Store } from "vuex";

declare module "vue/types/vue" {
  // 3. Declare augmentation for Vue
  interface Vue {
    $can: (actionName: string, obj: ObjWithUsersField) => boolean;
    $user: (isStatus: string) => boolean;
    $userName: () => string;
    $userRoles: () => string[];
  }
}

interface ObjWithUsersField {
  users: (CouchUser | string)[];
  reference?: boolean;
}
const USER_ADMIN = "admin";
const DB_ADMIN = "_admin";
const SPECIALIST = "specialist";
const USER = "user";

export function checkIfUserExist(
  user: CouchUser | string,
  users: (CouchUser | string)[]
): boolean {
  // Try for name or sub
  // filter users with object style
  const usersObject: CouchUser[] = users.filter(
    (x) => typeof x === "object" && x !== null
  ) as CouchUser[];
  const usersString = users.filter((x) => typeof x == "string");
  const usersName: string[] = usersObject
    .map((x) => x?.name)
    .filter((x) => x !== undefined) as string[];
  const usersSub: string[] = usersObject
    .map((x) => x?.sub)
    .filter((x) => x !== undefined) as string[];
  const allPossibleUsers = usersString.concat(usersName).concat(usersSub);
  // BIG warning if name of user contains @unhcr.org the couchdb won't allow them
  if (typeof user === "string") {
    return allPossibleUsers.includes(user);
  }
  return (
    allPossibleUsers.includes(user?.name ?? "") ||
    allPossibleUsers.includes(user?.sub ?? "")
  );
}

export function checkUserExists(
  values: (CouchUser | string)[]
): (v: string | CouchUser) => boolean | string {
  return (value: string | CouchUser) => {
    return !checkIfUserExist(value, values) || "Already exists.";
  };
}

export default new (class User {
  public install(Vue: VueConstructor, { store }: { store: Store<CouchUser> }) {
    Vue.prototype.$can = (
      actionName: string,
      obj: ObjWithUsersField
    ): boolean => {
      // return false or true
      const user = store.getters["UserModule/user"];
      if (user.loaded) {
        const isAdmin =
          user.roles.indexOf(USER_ADMIN) >= 0 ||
          user.roles.indexOf(DB_ADMIN) >= 0;

        if (actionName === "admin") {
          return isAdmin;
        }
        const isUser = user.roles.indexOf(GUEST_NAME) == -1;
        // only guest are not allowed to create!
        // if roles is empty it means it's a unhcr account
        if (actionName === "create") {
          return isUser;
        }
        if (obj?.users === undefined) {
          return false;
        }
        const isAuthor = checkIfUserExist(user, obj?.users);
        if (actionName === "edit") {
          if (obj.reference) {
            return false;
          }
          return isAuthor || isAdmin;
        }

        if (actionName === "delete") {
          return isAuthor || isAdmin;
        }
      }

      return false;
    };

    Vue.prototype.$user = (isStatus: string): boolean => {
      const user = store.getters["UserModule/user"];
      const rights = {
        isUserAdmin: user.loaded && user.roles.indexOf(USER_ADMIN) >= 0,
        isDBAdmin: user.loaded && user.roles.indexOf(DB_ADMIN) >= 0,
        isSpecialist: user.loaded && user.roles.indexOf(SPECIALIST) >= 0,
        isUser: user.loaded && user.roles.indexOf(USER) >= 0,
        isGuest: user.loaded && user.name === GUEST_NAME,
        isLoggedIn: user.loaded && user.name.length > 0,
        isLoggedOut: user.loaded && user.name.length == 0,
      } as Record<string, boolean>;
      return rights[isStatus];
    };

    Vue.prototype.$userName = (): string => {
      const user = store.getters["UserModule/user"];
      return user.name;
    };

    Vue.prototype.$userRoles = (): string[] => {
      const user = store.getters["UserModule/user"];
      return user.roles;
    };
  }
})();
