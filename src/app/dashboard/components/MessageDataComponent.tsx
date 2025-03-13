"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import MessageTable, { Inbox } from "./IboxDataTable";
import { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import graphqlHelper from "@/utils/graphqlClient";
import { DateTime } from "luxon";

const GET_INBOX = gql`
  query GetInBoxByDate($startDate: String!, $endDate: String!) {
    getInBoxByDate(startDate: $startDate, endDate: $endDate) {
      message
      type
      createdAt
      to
    }
  }
`;

const InboxData = () => {
  const [messageList, setMessageList] = useState<Inbox[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function getMessageReport(startDate?: string, endDate?: string) {
    setLoading(true);
    try {
      const data = await graphqlHelper.executeQuery(GET_INBOX, { startDate, endDate });

      // Ensure we only set the array, preventing "map is not a function" error
      setMessageList(data?.getInBoxByDate || []);

      setLoading(false);
      console.log("Inbox Messages:", data?.getInBoxByDate);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching messages:", error);
    }
  }

  return (
    <div>
      <div className="mt-10 w-auto p-8 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getMessageReport(startDate, endDate);
          }}
        >
          <div className="flex flex-col gap-5.5 sm:flex-row">
            <DatePickerOne label="Start Date" value={startDate} onChange={setStartDate} />
            <DatePickerOne label="End Date" value={endDate} onChange={setEndDate} />
          </div>
          <button
            className="flex justify-center mb-4 rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
            type="submit"
          >
            {loading ? "Fetching Data..." : "Submit"}
          </button>
        </form>
      </div>
      <MessageTable getInboxByDate={messageList} loading={loading} />
    </div>
  );
};

export default InboxData;
