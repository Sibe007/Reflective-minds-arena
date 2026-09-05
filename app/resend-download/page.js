import ResendDownloadForm from "../../components/ResendDownloadForm";

export const metadata = {
  title: "Resend My Download Link — Solomon B. Ibe",
  description: "Lost your download link or has it expired? Get a fresh one sent to your email.",
  openGraph: {
    title: "Resend My Download Link — Solomon B. Ibe",
    description: "Lost your download link or has it expired? Get a fresh one sent to your email.",
    url: "https://reflectivemindsarena.com.ng/resend-download",
    type: "website",
  },
};

export default function ResendDownloadPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">Home / Resend Download Link</div>
          <h1>Lost Your Download Link?</h1>
          <p>Enter the email and order reference from your confirmation email, and we'll send a fresh one.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <ResendDownloadForm />
        </div>
      </section>
    </>
  );
}