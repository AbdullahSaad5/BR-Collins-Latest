import React from 'react';
import { List, Tag, Progress, Button, Avatar } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h2`
  margin-bottom: 24px;
  font-size: 24px;
  color: #333;
`;

const CourseItem = styled(List.Item)`
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  margin-bottom: 16px;
  transition: all 0.3s;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
    border-color: transparent;
  }
`;

const CourseContent = styled.div`
  display: flex;
  width: 100%;
`;

const Thumbnail = styled(Avatar)`
  width: 120px;
  height: 80px;
  margin-right: 20px;
  border-radius: 4px;
`;

const CourseInfo = styled.div`
  flex: 1;
`;

const CourseActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 180px;
`;

const ContinueButton = styled(Button)`
  background-color: #1890ff;
  color: white;
  border-color: #1890ff;
  margin-bottom: 8px;
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const EnrolledCourses = () => {
  const enrolledCourses = [
    {
      id: 1,
      title: 'Introduction to React',
      instructor: 'Jane Smith',
      progress: 65,
      thumbnail: 'https://via.placeholder.com/150',
      category: 'Web Development',
      lastAccessed: '2 days ago',
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      instructor: 'John Doe',
      progress: 30,
      thumbnail: 'https://via.placeholder.com/150',
      category: 'Programming',
      lastAccessed: '1 week ago',
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      instructor: 'Alex Johnson',
      progress: 90,
      thumbnail: 'https://via.placeholder.com/150',
      category: 'Design',
      lastAccessed: 'Yesterday',
    },
  ];

  return (
    <Container>
      <Header>My Enrolled Courses</Header>
      
      <List
        dataSource={enrolledCourses}
        renderItem={(course) => (
          <CourseItem>
            <CourseContent>
              <Thumbnail src={course.thumbnail} shape="square" />
              <CourseInfo>
                <h3>{course.title}</h3>
                <p>Instructor: {course.instructor}</p>
                <MetaRow>
                  <Tag color="blue">{course.category}</Tag>
                  <span>Last accessed: {course.lastAccessed}</span>
                </MetaRow>
                <Progress 
                  percent={course.progress} 
                  status="active" 
                  showInfo={false}
                />
                <span>{course.progress}% complete</span>
              </CourseInfo>
              <CourseActions>
                <ContinueButton type="primary" block>
                  Continue Learning
                </ContinueButton>
                <Button block>View Details</Button>
              </CourseActions>
            </CourseContent>
          </CourseItem>
        )}
      />
    </Container>
  );
};

export default EnrolledCourses;