import {
    db, auth
} from '../firebaseConfig'

export const facultyService = {
    getAllFacultyData,
    signUpFaculty,
    editFaculty,
    deleteFaculty,
    getUserById,
    updateFacultyProfile,
}

async function getAllFacultyData() {
    try {
        const doc = await db.collection('pages').doc('faculties').get();
        if (doc.exists) {
            const data = doc.data();
            // const faculty = {
            //     id: doc.id,
            //     faculties: data.faculties || [],
            // };
            const faculty = data.faculties || []
            console.log("all Faculty data fetched", faculty)

            return faculty;
        } else {
            throw new Error('Faculty not found');
        }
    } catch (error) {
        console.error('Error retrieving faculty data:', error);
        throw error;
    }
}

async function getUserById() {
    try {
        console.log('Getting user id')
        var userId;
        const user = auth.currentUser;
        if (user) {
            userId = user.uid
            console.log("User ID:", user.uid);

            const doc = await db.collection('profile').doc(userId).get();
            if (doc.exists) {
                const data = doc.data();
               

                return data;
            } else {
                throw new Error('user not found');
            }
        }
    } catch (error) {
        console.error('Error retrieving faculty data:', error);
        throw error;
    }
}

async function signUpFaculty(facultyData) {
    try {
        console.log('signUpFaculty', facultyData)
        // Create user with email and password
        const { email, password } = facultyData;
        console.log('email, password', email, password)

        const userCredential = await auth.createUserWithEmailAndPassword(email, password);

        // Get the user ID
        const userId = userCredential.user.uid;
        facultyData['id'] = userId;
        facultyData['isAdmin'] = false;


        console.log("facultyData with id", facultyData);

        // Add faculty data to the "profile" collection
        await db.collection('profile').doc(userId).set(facultyData)

        var allFacultyData = await getAllFacultyData();

        allFacultyData.push(facultyData);

        await db.collection('pages').doc('faculties').update({
            faculties: allFacultyData
        }).then(() => {
            console.log("faculty Document successfully updated! ");
        }).catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document for faculty: ", error);
        });

        console.log('Faculty created successfully');
    } catch (error) {
        console.error('Error creating faculty:', error);
        throw error;
    }
}

async function updateFacultyProfile(details){
    try {
        console.log('Getting user id')
        var userId;
        const user = auth.currentUser;
        if (user) {
            userId = user.uid
            console.log("User ID:", user.uid);

            await db.collection('profile').doc(userId).update({
                name: details.name,
                designation: details.designation,
                // email: details.email,
                mobile: details.mobile,
                dob: details.dob,
                doj: details.doj,
                gender: details.gender,
                qualification: details.qualification,
            })
            
        }
    } catch (error) {
        console.error('Error updating faculty data:', error);
        throw error;
    }
}

async function editFaculty(facultyData) {
    try {
        console.log('editFaculty', facultyData)
        // Create user with email and password
        const { email, password, id } = facultyData;
        console.log('email, password, id', email, password, id)



        // Add faculty data to the "profile" collection
        await db.collection('profile').doc(id).set(facultyData)

        var allFacultyData = await getAllFacultyData();

        // allFacultyData.push(facultyData);
        // allFacultyData.map((obj) => {
        //     if (obj.id === id) {
        //         return { ...obj, ...facultyData };
        //     }
        //     return obj;
        // });

        console.log("allFacultyData", allFacultyData)

        var index = allFacultyData.findIndex((object) => {
            return object.id === id;
        });
        // console.log("index", index)

        Object.assign(allFacultyData[index], facultyData);

        await db.collection('pages').doc('faculties').update({
            faculties: allFacultyData
        }).then(() => {
            console.log("faculty Document successfully updated! ");
        }).catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document for faculty: ", error);
        });

        console.log('Faculty created successfully');
    } catch (error) {
        console.error('Error creating faculty:', error);
        throw error;
    }
}

async function deleteFaculty(facultyData) {
    try {
        console.log('deleteFaculty', facultyData)

        // Create user with email and password
        const { email, password, id } = facultyData;
        console.log('email, password, id', email, password, id)

        const user = id

        await user.delete().then(() => {
            // User deleted.
            console.error(' deleteting user');

        }).catch((error) => {
            // An error ocurred
            // ...
            console.error('Error deleting user:', error);
        });




        // console.log("facultyData with id", facultyData);

        // Add faculty data to the "profile" collection
        // await db.collection('profile').doc(userId).set(facultyData)
        await db.collection('profile').doc(id).delete();

        var allFacultyData = await getAllFacultyData();

        var index = allFacultyData.findIndex((object) => {
            return object.id === id;
        });
        // console.log("index", index)
        allFacultyData.splice(index, 1);

        // Object.assign(allFacultyData[index], facultyData);

        await db.collection('pages').doc('faculties').update({
            faculties: allFacultyData
        }).then(() => {
            console.log("faculty Document successfully updated! ");
        }).catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document for faculty: ", error);
        });

        console.log('Faculty created successfully');
    } catch (error) {
        console.error('Error creating faculty:', error);
        throw error;
    }
}

