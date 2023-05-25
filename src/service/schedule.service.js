import {
    db
} from '../firebaseConfig'

export const scheduleService = {
    getAllScheduleData,
    updateScheduleData,
    addScheduleData,
    getUserById,

}

async function getAllScheduleData() {
    try {
        const doc = await db.collection('pages').doc('schedules').get();
        if (doc.exists) {
            const data = doc.data();
            // const schedule = {
            //     id: doc.id,
            //     faculties: data.faculties || [],
            // };
            const schedule = data.schedule || []
            console.log("all schedule data fetched", schedule)

            return schedule;
        } else {
            throw new Error('schedule not found');
        }
    } catch (error) {
        console.error('Error retrieving all schedule data:', error);
        throw error;
    }
}

async function getUserById(uid) {
    try {
        console.log('Getting user id',uid)
       
        

            const doc = await db.collection('profile').doc(uid).get();
            if (doc.exists) {
                const data = doc.data();
                console.log('Getting user data',data)

                return data;
            } else {
                throw new Error('user not found');
            }
        
    } catch (error) {
        console.error('Error retrieving faculty data:', error);
        throw error;
    }
}

async function addScheduleData(ScheduleData) {
    try {

        console.log('addschedule', ScheduleData)
        const { exam, selectedFaculty  } = ScheduleData;
        const facId = selectedFaculty.id
        console.log("facId", facId)
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();

        const formattedTime = `${hours}:${minutes}:${seconds}`;

        ScheduleData['id'] = exam.title+selectedFaculty.name+formattedTime;

        var allScheduleData = await getAllScheduleData();
        console.log("allScheduleData", allScheduleData)

        allScheduleData.push(ScheduleData);


        await db.collection('pages').doc('schedules').update({
            schedule: allScheduleData
        }).then(() => {
            console.log("schedule Document successfully added! ");
        }).catch((error) => {
            // The document probably doesn't exist.
            console.error("Error adding document for schedule: ", error);
        });

        var userData = await getUserById(facId)
        var userSchedules = userData.schedules || [];

        userSchedules.push(ScheduleData)

        await db.collection('profile').doc(facId).update({
            schedules: userSchedules
        })

    } catch (error) {
        console.error('Error adding all schedule data:', error);
        throw error;
    }
}


async function updateScheduleData(ScheduleData) {
    try {

        console.log('editschedule', ScheduleData)
        // Create user with email and password
        const {  id,selectedFaculty } = ScheduleData;
        const facId = selectedFaculty.id
        console.log("facId", facId)
        var allScheduleData = await getAllScheduleData();
        console.log("allScheduleData", allScheduleData)

        var index = allScheduleData.findIndex((object) => {
            return object.id === id;
        });
        // console.log("index", index)

        Object.assign(allScheduleData[index], ScheduleData);

        await db.collection('pages').doc('schedules').update({
            schedules: allScheduleData
        }).then(() => {
            console.log("schedule Document successfully updated! ");
        }).catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document for schedule: ", error);
        });

        var userData = await getUserById(facId)
        console.log("index userData", userData)

        var userSchedules = userData.schedules || [];
        console.log("userSchedules", userSchedules)


        var indd = userSchedules.findIndex((object) => {
            return object.id === id;
        });
        console.log("indd", indd)

        if(index > 0){
            Object.assign(userSchedules[indd], ScheduleData);

        }else{
            userSchedules.push(ScheduleData)

        }


        await db.collection('profile').doc(facId).update({
            schedules: userSchedules
        })

    } catch (error) {
        console.error('Error updating all schedule data:', error);
        throw error;
    }
}