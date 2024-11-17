"use client";
import React from "react";

export default function Page({ params }) {
  const [messageId, setMessageId] = React.useState(null);

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setMessageId(resolvedParams.message_id);
    });
  }, [params]);

  if (!messageId) return <p>Loading...</p>;

  return <p>Message ID: {messageId}</p>;
}
