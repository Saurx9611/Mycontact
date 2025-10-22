import React from "react";
import avatar from '../images/user.png'; 
import starFilled from "../images/star-filled.png";
import starEmpty from "../images/star-empty.png";
import './Card.css';

// 1. Accept 'onDelete' as a prop
export default function Card({ contact, onToggleFavorite, onDelete }) {
    
    const { firstName, lastName, phone, email, isFavorite } = contact;
    
    let staricon = isFavorite ? starFilled : starEmpty;
    
    const altText = `User profile picture of ${firstName} ${lastName}`;
    
    return (
        <article className="card">
            <img
                src={avatar}
                className="avatar"
                alt={altText}
            />
            <div className="info">
                <button
                    onClick={onToggleFavorite} 
                    aria-pressed={isFavorite}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    className="favorite-button"
                >
                    <img
                        src={staricon}
                        alt={isFavorite ? "filled star icon" : "empty star icon"}
                        className="favorite"
                    />
                </button>
                <h2 className="name">
                    {firstName} {lastName}
                </h2>
                <p className="contact">{phone}</p>
                <p className="contact">{email}</p>
                
                {/* 2. Add the delete button */}
                <button className="delete-button" onClick={onDelete}>
                  Delete
                </button>
            </div>
        </article>
    );
}