import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import { AppContext } from '../Context'
import {
  FaCode,
  FaCalendarAlt,
  FaGraduationCap,
  FaCheckCircle,
  FaServer,
  FaMobile,
  FaPalette,
  FaLayerGroup
} from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function Courses() {

  const { courses, selectCoursebyUser, handleSelectCourse } = useContext(AppContext)

  const getSkillIcon = (skill) => {
    const skillLower = skill.toLowerCase();

    if (skillLower.includes('html') || skillLower.includes('css') || skillLower.includes('js')) {
      return <FaCode className="text-blue-500 text-sm" />;
    } else if (skillLower.includes('react') || skillLower.includes('next')) {
      return <FaPalette className="text-cyan-500 text-sm" />;
    } else if (skillLower.includes('nest') || skillLower.includes('server')) {
      return <FaServer className="text-green-500 text-sm" />;
    } else if (skillLower.includes('native') || skillLower.includes('mobile')) {
      return <FaMobile className="text-purple-500 text-sm" />;
    } else {
      return <FaCheckCircle className="text-gray-500 text-sm" />;
    }
  }
  const getPreviewSkills = (skills) => {
    if (!skills || !Array.isArray(skills)) return [];
    return skills.slice(0, 4);
  }

  return (
    <div className='w-full min-h-screen bg-linear-to-br from-gray-900 to-black text-white'>
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Our Courses
          </h1>
          <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            Browse through our comprehensive selection of courses designed to make your future bright
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
              <FaLayerGroup className="text-yellow-500" />
              <span>Total Courses: </span>
              <span className="font-semibold">{courses?.length || 0}</span>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="max-w-7xl mx-auto">
          {courses && courses.length > 0 ? (
            <>
              {/* Grid View */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {courses.map((course, index) => (
                  <div
                    key={course._id || index}
                    className="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20 border border-gray-700 flex flex-col h-full"
                  >
                    {/* Course Header */}
                    <div className="p-6 border-b border-gray-700">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-white truncate">
                          {course.title || "Full Stack Development"}
                        </h3>
                        <span className="bg-blue-900/30 text-blue-400 text-xs font-bold px-3 py-1 rounded-full">
                          #{index + 1}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {course.description || "Make Your Future Bright"}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <FaCalendarAlt className="text-yellow-500" />
                        <span>{course.duration || "Atleast After Matric"}</span>
                      </div>
                    </div>

                    {/* Skills Preview */}
                    <div className="p-6 grow">
                      <div className="flex items-center gap-2 mb-4">
                        <FaCode className="text-blue-500" />
                        <h4 className="font-semibold text-lg">Technologies</h4>
                        <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                          {course.skills?.length || 0} skills
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {getPreviewSkills(course.skills).map((skill, idx) => (
                          <span
                            key={idx}
                            className="flex items-center gap-1.5 bg-gray-700/50 px-3 py-1.5 rounded-full text-sm"
                          >
                            {getSkillIcon(skill)}
                            <span className="truncate max-w-20">{skill}</span>
                          </span>
                        ))}
                        {course.skills?.length > 4 && (
                          <span className="bg-gray-700/70 px-3 py-1.5 rounded-full text-sm">
                            +{course.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Course Footer */}
                    <div className="p-6 border-t border-gray-700 bg-gray-900/30">
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-400">
                          <span>Course ID: </span>
                          <span className="font-mono">{course._id?.substring(0, 6) || "N/A"}</span>
                        </div>
                        <button onClick={() => toast.error("View Feature is Under Development")} className="bg-linear-to-r cursor-pointer from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Alternative Table View Toggle (Optional) */}
              <div className="mb-8 p-6 bg-gray-800/30 rounded-2xl border border-gray-700">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <FaGraduationCap className="text-green-500" />
                  All Courses Summary
                </h3>

                <div className="overflow-x-auto rounded-xl border border-gray-700">
                  {/* Set max height for vertical scroll */}
                  <div className="max-h-96 overflow-y-auto ds ">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-800 sticky top-0 z-10">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Course</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Duration</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Skills</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-900/50 divide-y divide-gray-800">
                        {courses.map((course, index) => (
                          <tr key={index} className="hover:bg-gray-800/50 transition-colors">
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-bold text-white">{course.title}</div>
                                <div className="text-sm text-gray-400">{course.description}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <FaCalendarAlt className="text-yellow-500" />
                                <span>{course.duration}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {course.skills?.slice(0, 3).map((skill, idx) => (
                                  <span key={idx} className="bg-gray-700 px-2 py-1 rounded text-xs">{skill}</span>
                                ))}
                                {course.skills?.length > 3 && (
                                  <span className="text-gray-400 text-xs">+{course.skills.length - 3}</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleSelectCourse(course._id)}
                                className={`px-4 py-2 rounded-lg text-sm transition-all duration-150 cursor-pointer ease-linear 
                                      ${selectCoursebyUser.includes(course._id)
                                    ? "bg-gray-500 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 active:scale-95 text-white"
                                  }`}
                              >
                                {selectCoursebyUser.includes(course._id) ? "Selected" : "Select"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </>
          ) : (
            /* No Courses Message */
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800 mb-6">
                <FaGraduationCap className="text-4xl text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-300">No Courses Available</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Currently there are no courses to display. Please check back later or contact the institute.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}