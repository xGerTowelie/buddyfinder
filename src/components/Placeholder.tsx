import React from 'react'

interface PlaceholderProps {
    width: number
    height: number
    text?: string
}

const Placeholder: React.FC<PlaceholderProps> = ({ width, height, text }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="100%" height="100%" fill="#cccccc" />
            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="#333333"
                fontSize="20"
                fontFamily="Arial, sans-serif"
            >
                {text || `${width}x${height}`}
            </text>
        </svg>
    )
}

export default Placeholder
