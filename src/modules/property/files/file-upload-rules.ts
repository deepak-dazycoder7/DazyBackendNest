const propertyUploadRules = {
    room: {
        singleRoom: {
            bathroomType: {
                shared: {
                    images: {
                        room: 2,
                        bathroom: 1,
                        hall: 2,
                        kitchen: 2,
                        frontSide: 2,
                        balconyView: 2,
                    },
                    video: 1,
                },
                separate: {
                    images: {
                        room: 2,
                        bathroom: 1,
                        hall: 2,
                        kitchen: 2,
                        frontSide: 2,
                        balconyView: 2,
                    },
                    video: 1,
                },
            },
        },
        sharedRoom: {
            bathroomType: {
                shared: {
                    images: {
                        room: 2,
                        bathroom: 1,
                        hall: 2,
                        kitchen: 1,
                        frontSide: 1,
                        balconyView: 1,
                    },
                    video: 1,
                },
                separate: {
                    images: {
                        room: 2,
                        bathroom: 1,
                        hall: 2,
                        kitchen: 2,
                        frontSide: 1,
                        balconyView: 1,
                    },
                    video: 1,
                },
            },
        },
    },
    villas: {
        separateVillas: {
            images: {
                room: 3,
                bathroom: 3,
                hall: 2,
                kitchen: 2,
                frontSide: 2,
                balconyView: 2,
                garden: 2,
                gym: 2,    
                diningArea: 2, 
                walkingArea: 2, 
            },
            video: 1,
        },
        attachedVillas: {
            images: {
                room: 3,
                bathroom: 2,
                hall: 2,
                kitchen: 2,
                frontSide: 2,
                balconyView: 2,
                garden: 2, 
                gym: 2,   
                diningArea: 2, 
                walkingArea: 2, 
            },
            video: 1,
        },
        "1bhk": {
            images: {
                room: 1,
                bathroom: 1,
                hall: 2,
                kitchen: 1,
                frontSide: 1,
                balconyView: 1,
            },
            video: 1,
        },
        "2bhk": {
            images: {
                room: 2,
                bathroom: 1,
                hall: 2,
                kitchen: 2,
                frontSide: 2,
                balconyView: 2,
            },
            video: 1,
        },
        "3bhk": {
            images: {
                room: 3,
                bathroom: 2,
                hall: 2,
                kitchen: 2,
                frontSide: 2,
                balconyView: 2,
            },
            video: 1,
        },
        "5bhk": {
            images: {
                room: 5,
                bathroom: 3,
                hall: 2,
                kitchen: 2,
                frontSide: 2,
                balconyView: 2,
            },
            video: 1,
        },
    },
    flats: {
        "1bhk": {
            images: {
                room: 1,
                bathroom: 1,
                hall: 2,
                kitchen: 1,
                frontSide: 1,
                balconyView: 1,
            },
            video: 1,
        },
        "2bhk": {
            images: {
                room: 2,
                bathroom: 1,
                hall: 2,
                kitchen: 1,
                frontSide: 1,
                balconyView: 1,
            },
            video: 1,
        },
        "3bhk": {
            images: {
                room: 3,
                bathroom: 2,
                hall: 2,
                kitchen: 2,
                frontSide: 2,
                balconyView: 2,
            },
            video: 1,
        },
        "5bhk": {
            images: {
                room: 5,
                bathroom: 3,
                hall: 2,
                kitchen: 2,
                frontSide: 2,
                balconyView: 2,
            },
            video: 1,
        },
    },
    independentHouseFlats: {
        "1bhk": {
            images: {
                room: 1,
                bathroom: 1,
                hall: 2,
                kitchen: 1,
                frontSide: 1,
                balconyView: 1,
            },
            video: 1,
        },
        "2bhk": {
            images: {
                room: 2,
                bathroom: 1,
                hall: 2,
                kitchen: 2,
                frontSide: 2,
                balconyView: 2,
            },
            video: 1,
        },
        "3bhk": {
            images: {
                room: 3,
                bathroom: 2,
                hall: 2,
                kitchen: 2,
                frontSide: 2,
                balconyView: 2,
            },
            video: 1,
        },
        "5bhk": {
            images: {
                room: 5,
                bathroom: 3,
                hall: 2,
                kitchen: 2,
                frontSide: 2,
                balconyView: 2,
            },
            video: 1,
        },
        separateHouse: {
            images: {
                room: 5,
                bathroom: 3,
                hall: 2,
                kitchen: 2,
                frontSide: 2,
                balconyView: 2,
                garden: 2, 
                gym: 2,
                diningArea: 2,
                walkingArea: 2,
            },
            video: 1,
        },
    },
};

  
  export function getUploadRules(category?: any, subCategory?: any, bathroomType?: string) {
    if (!propertyUploadRules[category]) {
      throw new Error(`Invalid category: ${category}`);
    }
  
    const categoryRules = propertyUploadRules[category];
    if (!categoryRules[subCategory]) {
      throw new Error(`Invalid sub-category: ${subCategory}`);
    }
  
    const subCategoryRules = categoryRules[subCategory];
    if (bathroomType && subCategoryRules.bathroomType) {
      return subCategoryRules.bathroomType[bathroomType];
    }
  
    return subCategoryRules;
  }
  