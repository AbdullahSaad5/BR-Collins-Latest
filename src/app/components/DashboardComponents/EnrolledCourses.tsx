import React from "react";
import { List, Tag, Progress, Button, Avatar } from "antd";
import styled from "styled-components";

const Container = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h2`
  margin-bottom: 32px;
  font-size: 28px;
  color: #1a1a1a;
  font-weight: 600;
`;

const CourseItem = styled(List.Item)`
  padding: 0;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  margin-bottom: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  background: #fff;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: transparent;
    transform: translateY(-4px);
  }
`;

const CourseContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 32px;
  gap: 24px;
`;

const Thumbnail = styled(Avatar)`
  width: 160px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CourseInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const CourseTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 20px;
  color: #1a1a1a;
  font-weight: 600;
  line-height: 1.4;
`;

const InstructorText = styled.p`
  margin: 0 0 16px 0;
  color: #666;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const LastAccessed = styled.span`
  color: #8c8c8c;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ProgressContainer = styled.div`
  margin-top: 12px;
`;

const ProgressText = styled.span`
  display: block;
  margin-top: 6px;
  color: #1890ff;
  font-size: 14px;
  font-weight: 500;
`;

const CourseActions = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 180px;
  gap: 12px;
  padding-left: 24px;
  border-left: 1px solid #f0f0f0;
`;

const ContinueButton = styled(Button)`
  background-color: #1890ff;
  color: white;
  border-color: #1890ff;
  height: 42px;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
    transform: translateY(-1px);
  }
`;

const ViewDetailsButton = styled(Button)`
  height: 42px;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const EnrolledCourses = () => {
  const enrolledCourses = [
    {
      id: 1,
      title: "Introduction to React",
      instructor: "Jane Smith",
      progress: 65,
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "Web Development",
      lastAccessed: "2 days ago",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      instructor: "John Doe",
      progress: 30,
      thumbnail:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "Programming",
      lastAccessed: "1 week ago",
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      instructor: "Alex Johnson",
      progress: 90,
      thumbnail:
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "Design",
      lastAccessed: "Yesterday",
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
                <CourseTitle>{course.title}</CourseTitle>
                <InstructorText>Instructor: {course.instructor}</InstructorText>
                <MetaRow>
                  <Tag color="blue">{course.category}</Tag>
                  <LastAccessed>Last accessed: {course.lastAccessed}</LastAccessed>
                </MetaRow>
                <ProgressContainer>
                  <Progress percent={course.progress} status="active" showInfo={false} />
                  <ProgressText>{course.progress}% complete</ProgressText>
                </ProgressContainer>
              </CourseInfo>
              <CourseActions>
                <ContinueButton type="primary" block>
                  Continue Learning
                </ContinueButton>
                <ViewDetailsButton block>View Details</ViewDetailsButton>
              </CourseActions>
            </CourseContent>
          </CourseItem>
        )}
      />
    </Container>
  );
};

export default EnrolledCourses;
