function (doc) {
  function findShelterImage(images) {
    if (!images || typeof images !== 'object' || !Array.isArray(images)) {
      return '';
    }
    var firstImage = images.find(function(image) { return image.type === "Image"});
    if (!firstImage) {
      return '';
    }
    return firstImage;
  }
  // retrieve only fields necessary for listing shelters
  emit(doc._id, {
      name: doc.name,
      shelter_type: doc.shelter_type,
      location_name: doc.location_name,
      location_country: doc.location_country,
      latitude: doc.latitude,
      longitude: doc.longitude,
      _id: doc._id,
      users: doc.users,
      created_by: doc.created_by,
      created_at: doc.created_at,
      updated_at: doc.updated_at,
      image: findShelterImage(doc.images)
    });
}