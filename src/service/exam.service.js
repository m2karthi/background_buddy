import {
    db
} from '../firebaseConfig'

export const examService = {
    getAllExamData,
    updateExamData,
    addExamData,
    
}

async function getAllExamData(){
    try {
        const doc = await db.collection('pages').doc('exams').get();
        if (doc.exists) {
            const data = doc.data();
            // const exam = {
            //     id: doc.id,
            //     faculties: data.faculties || [],
            // };
            const exam = data.exams || []
            console.log("all exam data fetched", exam)

            return exam;
        } else {
            throw new Error('exam not found');
        }
    } catch (error) {
        console.error('Error retrieving all exam data:', error);
        throw error;
    }
}

async function addExamData(examData) {
    try {

        console.log('addExam', examData)
        const { title } = examData;
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();

        const formattedTime = `${hours}:${minutes}:${seconds}`;
       
        examData['id'] = title+formattedTime;

        var allExamData = await getAllExamData();
        console.log("allExamData", allExamData)

        allExamData.push(examData);


        await db.collection('pages').doc('exams').update({
            exams: allExamData
        }).then(() => {
            console.log("Exam Document successfully added! ");
        }).catch((error) => {
            // The document probably doesn't exist.
            console.error("Error adding document for exam: ", error);
        });

    } catch (error) {
        console.error('Error adding all exam data:', error);
        throw error;
    }
}


async function updateExamData(examData){
    try {

        console.log('editExam', examData)
        // Create user with email and password
        const {id } = examData;
        console.log(' id', id)
        var allExamData = await getAllExamData();
        console.log("allExamData", allExamData)

        var index = allExamData.findIndex((object) => {
            return object.id === id;
        });
        // console.log("index", index)

        Object.assign(allExamData[index], examData);

        await db.collection('pages').doc('exams').update({
            exams: allExamData
        }).then(() => {
            console.log("Exam Document successfully updated! ");
        }).catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document for exam: ", error);
        });

    } catch (error) {
        console.error('Error updating all exam data:', error);
        throw error;
    }
}