import axios from "axios"
import { useEffect, useState } from "react"
import { apiUrl } from '../../../apiUrl';
import { useParams } from 'react-router-dom';
import './ViewLesson.css';

function ViewLesson() {
    const {id} = useParams();
    const [lessonUrl, setLessonUrl] = useState("");
    const [lesson, setLesson] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
            const getLesson = async () =>{
                const config = {
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`,
                    },
                };
                try{
                const res = await axios.get(`${apiUrl}/api/admin/lesson/${id}`, config);
                const url = res.data.lesson.lesson_url;
                setLesson(res.data.lesson);
                setLessonUrl(url);
                }catch(err){
                    console.error("Error while fetching lesson:", err);
                }finally{
                    setIsLoading(false);
                }
            }
            getLesson();
    }, [id]);
    return (
        <div className="viewLesson-container">
            <div className="viewLesson-details-name">{lesson.name}</div>
            <div className="viewLesson-details">{lesson.instrument} {lesson.tag}</div>
                <div className="iframe-container">
                    {isLoading ? <div className="viewLesson-details">Loading...</div> 
                        :(<iframe 
                            src={`${lessonUrl}#toolbar=0`} 
                            title={`Lesson: ${id}`}
                            className="lesson-pdf-viewer"
                        />)
                    }
                </div>
        </div>
    )
}

export default ViewLesson
