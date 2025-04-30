import React, { useState, useEffect, useRef } from "react";
import "./MovieItem.css";

const MovieItem = ({ movie }) => {
  const { id, title, poster_path, overview } = movie;
  const [reviews, setReviews] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);

  const editInputRef = useRef(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(id)) || [];
    setReviews(stored);
  }, [id]);

  const handleAdd = () => {
    if (!input.trim()) return;
    const newReview = { id: Date.now(), content: input };
    const updated = [...reviews, newReview];
    setReviews(updated);
    localStorage.setItem(id, JSON.stringify(updated));
    setInput("");
  };

  const handleEdit = (reviewId) => {
    const content = reviews.find((r) => r.id === reviewId)?.content || "";
    setInput(content);
    setEditingId(reviewId);
  };

  const handleSave = () => {
    const updated = reviews.map((r) =>
      r.id === editingId ? { ...r, content: input } : r
    );
    setReviews(updated);
    localStorage.setItem(id, JSON.stringify(updated));
    setEditingId(null);
    setInput("");
  };

  const handleDelete = (reviewId) => {
    const updated = reviews.filter((r) => r.id !== reviewId);
    setReviews(updated);
    localStorage.setItem(id, JSON.stringify(updated));
    if (editingId === reviewId) {
      setEditingId(null);
      setInput("");
    }
  };

  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
      const length = editInputRef.current.value.length;
      editInputRef.current.setSelectionRange(length, length);
    }
  }, [editingId]);

  return (
    <div className="movie-item">
      <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={title} />
      <div className="movie-info">
        <h3>{title}</h3>
        <p>{overview}</p>

        <div className="review-buttons">
          <h4>리뷰 작성</h4>
          <textarea
            placeholder="리뷰를 입력하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {editingId ? (
            <button onClick={handleSave}>저장</button>
          ) : (
            <button onClick={handleAdd}>작성</button>
          )}
        </div>

        {editingId && (
          <div className="edit-review">
            <h4>리뷰 수정</h4>
            <textarea
              ref={editInputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="수정할 리뷰를 입력하세요"
            />
            <button onClick={handleSave}>저장</button>
            <button onClick={() => setEditingId(null)}>취소</button>
          </div>
        )}

        <div className="review-list">
          <h4>작성된 리뷰</h4>
          {reviews.length === 0 ? (
            <p>리뷰가 없습니다. 리뷰를 작성해 주세요!</p>
          ) : (
            reviews.map(({ id, content }) => (
              <div key={id} className="review-item">
                <textarea value={content} readOnly />
                <button onClick={() => handleEdit(id)}>수정</button>
                <button onClick={() => handleDelete(id)}>삭제</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
