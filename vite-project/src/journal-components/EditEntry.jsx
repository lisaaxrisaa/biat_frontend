// this file allows users to edit a specific journal entry and delete if they wish

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditEntry = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntry = async () => {
        try {
            const respponse
        }
    }
  })
};
