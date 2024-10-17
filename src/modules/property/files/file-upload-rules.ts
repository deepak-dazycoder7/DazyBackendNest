const filesUploadRules = {
    category: {
        room: {
            subCategory: {
                singleRoom: {
                    bathroom: {
                        sharedBathroom: {
                            images: {
                                room: 2,
                                bathroom: 1,
                                frontSide: 2,
                                balconyView: 2,
                            },
                            video: 1,
                        },
                        separateBathroom: {
                            images: {
                                room: 2,
                                bathroom: 1,
                                frontSide: 2,
                                balconyView: 2,
                            },
                            video: 1,
                        },
                    },
                },
                sharedRoom: {
                    bathroom: {
                        sharedBathroom: {
                            images: {
                                room: 2,
                                bathroom: 1,
                                kitchen: 1,
                                frontSide: 1,
                                balconyView: 1,
                            },
                            video: 1,
                        },
                        separateBathroom: {
                            images: {
                                room: 2,
                                bathroom: 1,
                                kitchen: 2,
                                frontSide: 1,
                                balconyView: 1,
                            },
                            video: 1,
                        },
                    },
                },
            },
        },

        villas: {
            subCategory: {
                separateVillas: {
                    images: {
                        room: 2,
                        bathroom: 1,
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
                        room: 2,
                        bathroom: 1,
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
                        room: 2,
                        bathroom: 1,
                        hall: 2,
                        kitchen: 2,
                        frontSide: 2,
                        balconyView: 2,
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
        },
        flats: {
            subCategory: {
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
        },
        independentHouseFlats: {
            subCategory: {
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
                separateFlat: {
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
        },
    },
};