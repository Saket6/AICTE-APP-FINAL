import React, { useState } from 'react';
import axios from 'axios';

function CreateCurr() {
  const [courseData, setCourseData] = useState({
    title: '',
    semester: '',
    subject: '',
    subject_code: '',
    elective: '',
    credit: '',
    modules: [],
  });

  const addModule = () => {
    setCourseData({
      ...courseData,
      modules: [...courseData.modules, {duration: '', topics: [] }],
    });
  };

  const addTopic = (moduleIndex) => {
    const updatedModules = [...courseData.modules];
    updatedModules[moduleIndex].topics.push({ title: '', resources: [] });
    setCourseData({ ...courseData, modules: updatedModules });
  };

  const addResource = (moduleIndex, topicIndex) => {
    const updatedModules = [...courseData.modules];
    updatedModules[moduleIndex].topics[topicIndex].resources.push({
      type: '',
      url: '',
      author: '',
    });
    setCourseData({ ...courseData, modules: updatedModules });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(courseData);
      // Send a POST request to your backend API endpoint
      const response = await axios.post('/create', courseData);

      // Handle success, show a success message, or redirect the user
      console.log('Course created successfully', response.data);
    } catch (error) {
      // Handle errors, display an error message, etc.
      console.error('Error creating course', error);
    }
  };

  return (
    <div>
      <form method='POST' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Course Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={courseData.title}
            onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="semester">Specify Semester</label>
          <input type="text"
            id="semester"
            name="semester"
            value={courseData.semester}
            onChange={(e) => setCourseData({ ...courseData, semester: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="subject">Subject</label>
          <input type='text'
            id="subject"
            name="subject"
            value={courseData.subject}
            onChange={(e) => setCourseData({ ...courseData, subject: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="subject_code">Specify Subject Code</label>
          <input type="text"
            id="subject_code"
            name="subject_code"
            value={courseData.subject_code}
            onChange={(e) => setCourseData({ ...courseData, subject_code: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="elective">Elective?</label>
          <select  id="elective"
            name="elective"
            value={courseData.elective}
            onChange={(e) => setCourseData({ ...courseData, elective: e.target.value })}
            >
              <option value="open">Open Elective</option>
              <option value="branch">Branch Elective</option>
              <option value="compulsary">Compulsary</option>
           
            </select>
        </div>
        <div>
          <label htmlFor="credit">Specify Credit</label>
          <input type="number"
            id="credit"
            name="credit"
            value={courseData.credit}
            onChange={(e) => setCourseData({ ...courseData, credit: e.target.value })}
          />
        </div>



        {courseData.modules.map((module, moduleIndex) => (
          <div key={moduleIndex}>
            <h2>Module {moduleIndex + 1}</h2>
            <div>
              <label htmlFor={`module-title-${moduleIndex}`}>Duration(number of classes to complete)</label>
              <input
                type="number"
                id={`module-duration-${moduleIndex}`}
                name={`module-duration-${moduleIndex}`}
                value={module.duration}
                onChange={(e) => {
                  const updatedModules = [...courseData.modules];
                  updatedModules[moduleIndex].duration = e.target.value;
                  setCourseData({ ...courseData, modules: updatedModules });
                }}
              />
            </div>
       

            {module.topics.map((topic, topicIndex) => (
              <div key={topicIndex}>
                <h3>Topic {topicIndex + 1}</h3>
                <div>
                  <label htmlFor={`topic-title-${moduleIndex}-${topicIndex}`}>Topic Title:</label>
                  <input
                    type="text"
                    id={`topic-title-${moduleIndex}-${topicIndex}`}
                    name={`topic-title-${moduleIndex}-${topicIndex}`}
                    value={topic.title}
                    onChange={(e) => {
                      const updatedModules = [...courseData.modules];
                      updatedModules[moduleIndex].topics[topicIndex].title = e.target.value;
                      setCourseData({ ...courseData, modules: updatedModules });
                    }}
                  />
                </div>
          

                {topic.resources.map((resource, resourceIndex) => (
                  <div key={resourceIndex}>
                    <h4>Resource {resourceIndex + 1}</h4>
                    <div>
                      <label htmlFor={`resource-type-${moduleIndex}-${topicIndex}-${resourceIndex}`}>Resource type:</label>
                      <select
                        id={`resource-type-${moduleIndex}-${topicIndex}-${resourceIndex}`}
                        name={`resource-type-${moduleIndex}-${topicIndex}-${resourceIndex}`}
                        value={resource.type}
                        onChange={(e) => {
                          const updatedModules = [...courseData.modules];
                          updatedModules[moduleIndex].topics[topicIndex].resources[resourceIndex].type = e.target.value;
                          setCourseData({ ...courseData, modules: updatedModules });
                        }}
                      >
                        <option value="video">Video</option>
                        <option value="Article">Article</option>
                        <option value="Book">Book</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor={`resource-url-${moduleIndex}-${topicIndex}-${resourceIndex}`}>Resource url:</label>
                      <input type='text'
                        id={`resource-url-${moduleIndex}-${topicIndex}-${resourceIndex}`}
                        name={`resource-url-${moduleIndex}-${topicIndex}-${resourceIndex}`}
                        value={resource.url}
                        onChange={(e) => {
                          const updatedModules = [...courseData.modules];
                          updatedModules[moduleIndex].topics[topicIndex].resources[resourceIndex].url = e.target.value;
                          setCourseData({ ...courseData, modules: updatedModules });
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor={`resource-author-${moduleIndex}-${topicIndex}-${resourceIndex}`}>Author(optional):</label>
                      <input
                        type="text"
                        id={`resource-author-${moduleIndex}-${topicIndex}-${resourceIndex}`}
                        name={`resource-author-${moduleIndex}-${topicIndex}-${resourceIndex}`}
                        value={resource.author}
                        onChange={(e) => {
                          const updatedModules = [...courseData.modules];
                          updatedModules[moduleIndex].topics[topicIndex].resources[resourceIndex].author = e.target.value;
                          setCourseData({ ...courseData, modules: updatedModules });
                        }}
                      />
                    </div>
                    
                  </div>
                ))}

                <button type="button" onClick={() => addResource(moduleIndex, topicIndex)}>
                  Add Resource
                </button>
              </div>
            ))}

            <button type="button" onClick={() => addTopic(moduleIndex)}>
              Add Topic
            </button>
          </div>
        ))}

        <button type="button" onClick={addModule}>
          Add Module
        </button>

        <button type="submit">Create Course</button>
      </form>
    </div>
  );
}

export {CreateCurr};