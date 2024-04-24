/* eslint-disable react/prop-types */
import { useState } from "react";
import AdminContext from "./adminContext";
import axios from "axios";

//contracts
import voterContract from "../../contracts/voter";
import candContract from "../../contracts/candidate";
import { prepareContractCall, resolveMethod, sendTransaction } from "thirdweb";

import { create } from "../../api/admin";

const AdminState = (props) => {
  const host = "http://localhost:5000/admin";
  const [voterList, setVoterList] = useState([]);
  const [candidateList, setCandidateList] = useState([]);

  const getVoterList = async () => {
    // console.log("test");
    try {
      const res = await fetch(`${host}/voterlist`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);
      setVoterList(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteVoter = async (id) => {
    try {
      const response = await fetch(`${host}/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete voter");
      }

      setVoterList((prevVoters) =>
        prevVoters.filter((voter) => voter._id !== id)
      );
    } catch (error) {
      console.error("Error deleting voter:", error);
    }
  };

  const approveVoter = async (id) => {
    try {
      const response = await fetch(`${host}/approve/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to Approve voter");
      }
    } catch (error) {
      console.error("Error Approving voter:", error);
    }
  };

  const getCandidateList = async () => {
    // console.log("test");
    try {
      const res = await fetch(`${host}/candidatelist`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setCandidateList(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleApprove = async (props) => {
    const { _aadharno, _email, _imgUrl, _name, _id, voter, account } = props;
    try {
      const transaction = await prepareContractCall({
        contract: voterContract,
        method: resolveMethod("addVoter"),
        params: [_id, _name, _aadharno, _email, _imgUrl],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
      if (transactionHash) {
        const approved = await approveVoter(voter._id);
        console.log({
          message: "Voter Approved Successfully",
          hash: transactionHash,
          approved,
        });
        return true;
      }
    } catch (error) {
      console.log("Voter Not Approved In Frontend");
      console.log(error);
    }
  };

  const uploadFile = async (
    type,
    candidateFirstName,
    candidateLastName,
    img
  ) => {
    const data = new FormData();
    data.append("file", type === "image" ? img : null);
    data.append("upload_preset", "image_preset");

    // Rename the file
    const fileName = `${candidateFirstName}_${candidateLastName}`;
    data.append("public_id", fileName);

    try {
      const resourceType = "image";
      const cloudName = "dcpajsgwj";
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  const addCandidate = async (props) => {
    const { _name, _election_id, _ward_no, _imgUrl, _party, account } = await props;
    try {
      const transaction = await prepareContractCall({
        contract: candContract,
        method: resolveMethod("addCandidate"),
        params: [_name, _election_id, _ward_no, _imgUrl, _party],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
      console.log(transactionHash);
      if (transactionHash) {
        console.log("Candidate Added to Blockchain");
        return true;
      }
    } catch (error) {
      console.log("Candidate Failed to Register on Blockchain");
      console.error(error);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        voterList,
        getVoterList,
        deleteVoter,
        approveVoter,
        candidateList,
        getCandidateList,
        handleApprove,
        addCandidate,
        uploadFile
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
