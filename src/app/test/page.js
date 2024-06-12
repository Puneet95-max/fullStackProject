"use client"
import LoaderComponent from '@/components/LoaderComponent/LoaderComponent';
import React, { useState, useEffect, useContext } from 'react';

function Test() {
  const [students, setStudents] = useState([]);

  return (
    <main>
      <h1>
        <LoaderComponent />
      </h1>

    </main>
  );
}

export default Test;
