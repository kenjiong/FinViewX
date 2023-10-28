// import { useState } from "react";
// import { Button, Form, Modal } from "react-bootstrap";
// import { useParams } from "react-router-dom";
// import { editReview } from "../../utilities/review-service";

// export default function EditReviewModal({ show, onHide, review }) {
// 	const { courseId } = useParams();
// 	const [comments, setComments] = useState(review.comments);
// 	const [rating, setRating] = useState(review.rating);

// 	const handleSaveChanges = async () => {
// 		const review = {
// 			comments,
// 			rating,
// 		};
// 		await editReview(review, courseId);
// 		onHide();
// 	};

// 	return (
// 		<Modal show={show} onHide={onHide}>
// 			<Modal.Header closeButton>
// 				<Modal.Title>Edit Review</Modal.Title>
// 			</Modal.Header>
// 			<Modal.Body>
// 				<Form>
// 					<Form.Group controlId="reviewText">
// 						<Form.Label>Your Review</Form.Label>
// 						<Form.Control
// 							as="textarea"
// 							rows={3}
// 							value={comments}
// 							onChange={(e) => setComments(e.target.value)}
// 						/>
// 					</Form.Group>
// 					<br />
// 					<Form.Group controlId="rating">
// 						<Form.Label>Rating</Form.Label>
// 						<Rating
// 							name="rating"
// 							value={rating}
// 							onChange={(_, newValue) => setRating(newValue)}
// 						/>
// 					</Form.Group>
// 				</Form>
// 			</Modal.Body>
// 			<Modal.Footer>
// 				<Button variant="primary" onClick={handleSaveChanges}>
// 					Save Changes
// 				</Button>
// 				<Button variant="secondary" onClick={onHide}>
// 					Cancel
// 				</Button>
// 			</Modal.Footer>
// 		</Modal>
// 	);
// }
