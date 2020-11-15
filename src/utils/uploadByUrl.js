import * as upload from '../api/uploaderApi.js';
import * as create from '../api/creatorApi.js';
import swal from 'sweetalert';


//const reload = () => window.location.reload(false);

const UploadByUrl = async ({type, typeId, levelName, mediaType,fileName,fileDesc,url, getMediaList},closeModal) => {
   
    type = type.trim().toLowerCase();
    try{
    switch (mediaType) {
        case 'video':{
            // code block
                switch (type) {
                    case 'course':
                        let payload = {}
                        payload.courseId = typeId;
                        payload.videoPath = url;
                        payload.videoname = fileName;
                        payload.videodescription = fileDesc;
                        await upload.courseVideoUpload(payload)
                        await swal({title: 'Success', text: 'File Created Successfully!',icon: 'success',timer: 900});
                        getMediaList();
                        closeModal();
                       // reload();
                        break;
                    case 'subject':
                    
                        let payload2 = {}
                        payload2.subjectId = typeId;
                        payload2.videoPath = url;
                        payload2.videoname = fileName;
                        payload2.videodescription = fileDesc;
                        await upload.courseSubjectUpload(payload2)     
                        await swal({title: 'Success',text: 'File Created Successfully!',icon: 'success',timer: 900});
                        getMediaList();
                        closeModal();
                      //  reload();
                        break;
                    case 'topic':
                        // code block
                        let payload3 = {}
                        payload3.topicId = typeId;
                        payload3.videoPath = url;
                        payload3.videoname = fileName;
                        payload3.videodescription = fileDesc;
                        await upload.courseTopicUpload(payload3)
                        await swal({title: 'Success',text: 'File Created Successfully!',icon: 'success',timer: 900});
                        getMediaList();
                        closeModal();
                       //reload();
                          break;
                    case 'chapter':
                        // code block 
                        let payload4 = {}
                        payload4.chapterId = typeId;
                        payload4.videoPath = url;
                        payload4.videoname = fileName;
                        payload4.videodescription = fileDesc;
                        await upload.courseChapterUpload(payload4)
                        await swal({title: 'Success',text: 'File Created Successfully!',icon: 'success',timer: 900});
                        getMediaList();
                        closeModal();
                      //  reload();
                        break;
                    default:
                         console.log(" this is the Default!")
                        }
                    }
            break;
     /*   case 'question':
            // code block
     
                S3FileUpload.uploadFile(file, excelConfig)
                    .then(data => {
                        console.log(data);
                        let payload = {}
                        payload.chapterName = levelName;
                        payload.questionDesc = url;
                        // payload.url = url;
                        switch (type) {
                            case 'chapter':
                                // code block
                                upload.courseQuestionUpload(payload).then(response => {
                                    console.log(response);
                                    alert("File successfully uploaded")
                                    this.setState({ File: null })
                                }).catch(error => {
                                    console.log(error);
                                });
                                break;
                            case 'y':
                                // code block
                                break;
                            default:
                            // code block
                        }
                    })
                    .catch(err => {
                        alert("Error : ", err)
                        
                    })
            break;*/
        case 'test':
              {
                        switch (type) {
                            case 'course':
                                let payload = {}
                                payload.courseId = typeId;
                                payload.courseName = levelName;
                                payload.url = url;
                                payload.TestTittle = fileName,
                                payload.type = fileDesc,
                                await create.courseTestUpload(payload)
                                await swal({title: 'Success',text: 'File Created Successfully!',icon: 'success',timer: 900});
                                getMediaList();
                                closeModal();
                               // reload();
                                break;
                            case 'subject':
                                // code block 
                                console.log("true for subject test!");
                                let payload2 = {}
                                payload2.subjectId = typeId;
                                payload2.subjectName = levelName;
                                payload2.url = url;
                                payload2.TestTittle = fileName,
                                payload2.type = fileDesc,
                                // payload.url = url;
                                await create.subjectTestUpload(payload2);
                                await swal({title: 'Success',text: 'File Created Successfully!',icon: 'success',timer: 900});
                                getMediaList();
                                closeModal();
                            //    reload();
                                break;
                            case 'topic':
                                // code block
                                let payload3 = {}
                                payload3.topicId = typeId;
                                payload3.topicName = levelName;
                                payload3.url = url;
                                payload3.TestTittle = fileName,
                                payload3.type = fileDesc,
                                await create.topicTestUpload(payload3)
                                await swal({title: 'Success',text: 'File Created Successfully!',icon: 'success',timer: 900});
                                getMediaList();
                                closeModal();
                              //  reload();
                                break;
                            case 'chapter':
                                // code block 
                                let payload4 = {}
                                payload4.chapterId = typeId;
                                payload4.chapterName = levelName;
                                payload4.url = url;
                                payload4.TestTittle = fileName,
                                payload4.type = fileDesc,
                                // payload.url = url;
                                await create.chapterTestUpload(payload4)
                                await swal({title: 'Success',text: 'File Created Successfully!',icon: 'success',timer: 900});
                                getMediaList();
                                closeModal();
                              //  reload();
                                break;
                            default:
                                console.log(" this is the Default!");
                                break;
                            }
                            // code block
                        }

                 
                  
            break;
        default:
        // code block
    } 
}
catch(err)
    {
        console.log(err);
    }
}

export default UploadByUrl;