import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { formatDate, printMaxCharacters } from "../../utils";

const ArticlePreview = ({
  title,
  description,
  content,
  source,
  category,
  image_url,
  web_url,
  date_published,
  author,
}) => {
  const openInNewTab = (url) => {
    window.open(url, "_blank").focus();
  };
  return (
    <Card
      style={
        image_url
          ? { width: "18rem", height: "35rem" }
          : { width: "18rem", height: "24rem" }
      }
      className="my-3"
    >
      {source && <Card.Header>{source}</Card.Header>}
      {image_url && <Card.Img variant="top" src={image_url} />}
      <Card.Body>
        <Card.Title>{printMaxCharacters(title, 60)}</Card.Title>
        {description && (
          <Card.Text>{printMaxCharacters(description)}</Card.Text>
        )}
        <Button variant="primary" onClick={() => openInNewTab(web_url)}>
          Read
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted text-center">
        <small>Published: {formatDate(date_published)}</small>
        <br />
        {author && <small>Author: {author}</small>}
      </Card.Footer>
    </Card>
  );
};

export default ArticlePreview;
