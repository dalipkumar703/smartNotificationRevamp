import { Button, List } from 'antd';
import React from 'react';
import { useState } from 'react';
export const ListItem = ({ item = '' }) => {
  const [readMore, setReadMore] = useState(false);
  const handleClick = () => {
    setReadMore(true);
  };
  return (
    <List.Item>
      {readMore && item}
      {!readMore && item.substr(0, 150)}
      {!readMore && item.length > 150 && (
        <Button style={{ backgroundColor: '#FFFF00' }} onClick={handleClick}>
          Read More
        </Button>
      )}
    </List.Item>
  );
};
