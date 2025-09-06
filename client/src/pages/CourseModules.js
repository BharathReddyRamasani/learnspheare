import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CourseModules = ({ match }) => {
  const courseId = match.params.courseId;
  const { socket } = useContext(AuthContext);
  const [modules, setModules] = useState([]); // Fetch from useCourseData
  const [selectedModule, setSelectedModule] = useState(null);
  const [content, setContent] = useState({ videoUrl: '', pdfUrl: '' });
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Fetch modules
    if (selectedModule) {
      axios.post('http://localhost:5000/api/courses/start-module', { courseId, moduleId: selectedModule.id });
      axios.get(`http://localhost:5000/api/courses/${courseId}/module/${selectedModule.id}/content`)
        .then(res => setContent(res.data));

      let interval;
      const visibilityHandler = () => {
        if (!document.hidden) {
          interval = setInterval(() => {
            setTimer(prev => prev + 1);
            socket.emit('module:timeUpdate', { courseId, moduleId: selectedModule.id, timeIncrement: 1 });
          }, 1000);
        } else {
          clearInterval(interval);
        }
      };
      document.addEventListener('visibilitychange', visibilityHandler);
      visibilityHandler();

      return () => {
        clearInterval(interval);
        document.removeEventListener('visibilitychange', visibilityHandler);
      };
    }
  }, [selectedModule, socket]);

  return (
    <div>
      {modules.map(mod => (
        <div key={mod.id} onClick={() => setSelectedModule(mod)}>
          Module {mod.id}
          {selectedModule?.id === mod.id && (
            <>
              {content.videoUrl && <video src={content.videoUrl} controls />}
              {content.pdfUrl && <iframe src={content.pdfUrl} />}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseModules;