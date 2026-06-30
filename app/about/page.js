export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">Home / About</div>
          <h1>About the Author</h1>
          <p>Writer. Independent publisher. Keeper of family stories that refused to stay quiet.</p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <p style={{ fontSize: "1.08rem", opacity: 0.8 }}>
            I write to keep things from being forgotten — the warnings my grandmother gave
            without explanation, the silences my family mistook for peace, the forests no one
            would name. My work moves between fiction grounded in Igbo cosmology and nonfiction
            grounded in my own uneven history.
          </p>
          <p style={{ fontSize: "1.08rem", opacity: 0.8 }}>
            I'm an independent publisher by necessity and by conviction: the stories I needed to
            tell didn't always fit the shape the industry expected of them, so I built a way to
            tell them properly.
          </p>
        </div>
      </section>
    </>
  );
}
