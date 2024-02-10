import React from 'react';
import './Popup.css';
import { useNavigate } from 'react-router-dom';

const Popup = ({ onClose, onRestartPlayback }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    // "모달만 닫습니다.
    onClose();
    onRestartPlayback();
  };

  return (
    <div>
      <div className="overlay"></div>

      <div className="popup">
        <div className="popup-content">
          <p>곡 선택 화면으로 돌아가시겠습니까?</p>
          <button onClick={() => navigate('/single/perfect')}>곡 선택 화면으로 돌아가기</button>
          <button onClick={handleCancel}>처음부터 시작하기</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
