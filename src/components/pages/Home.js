import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import ArticlePreview from "../dashboard/ArticlePreview";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getUserNoAuth, getToken } from "../../services/auth";
import { FetchUserFeed } from "../../services/dashboard";

const Home = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // confirm user is logged in
    const user = getUserNoAuth();
    const token = getToken();
    // console.log(user, token);
    if (token === null || user === null || user.id === null) {
      navigate("/login");
    }
    if (user) getFeed(user);
  }, []);

  const getFeed = async (user) => {
    // fetch articles for this user
    await FetchUserFeed(user.id, (response) => {
      const { status, message, data } = response;
      if (response === null || status !== true) {
        // Call failed
        // Display error
        setShowError(true);
      } else {
        // Successful call
        // update state
        let posts = data;
        posts = posts.map((post) => {
          const {
            title,
            description,
            content,
            source,
            category,
            image_url,
            web_url,
            date_published,
            author,
          } = post;
          return (
            <Col sm>
              <ArticlePreview
                title={title}
                description={description}
                content={content}
                source={source}
                category={category}
                image_url={image_url}
                web_url={web_url}
                date_published={date_published}
                author={author}
              />
            </Col>
          );
        });
        setPosts(posts);
      }
    });
  };

  const handleReload = (event) => {
    event.preventDefault();
    window.location.reload();
  };

  return (
    <AppLayout page_title="Home | Feed">
      <Container>
        {showError && (
          <div className="text-center">
            <h6>
              Unable to retrieve feed at this time.{" "}
              <a onClick={handleReload} href="#!">
                Refresh page
              </a>
              .
            </h6>
            <p>Please, try again later if refreshing doesn't work</p>
          </div>
        )}
        <Row>{React.Children.toArray(posts)}</Row>
      </Container>
    </AppLayout>
  );
};
export default Home;
