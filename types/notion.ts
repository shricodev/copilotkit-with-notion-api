export type TErrResponse = {
  success: false;
  error: Error;
};

export type TRow = {
  name: { id: string; title: { text: { content: string } }[] };
  meet_link: { id: string; url: string };
  dueDate?: { id: string; type: "date"; date?: { start: string; end: string } };
};
