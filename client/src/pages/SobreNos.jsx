import React from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../assets/styles/SobreNos.css'

const SobreNos = () => {
    return (
        <>

            <Navbar />

            <main className="heroSobre">
                <section className="team">
                    <div className="member left">
                        <img src="/img/icon-verde.png" alt="Integrante 1" />
                        <div className="info">
                            <h3>Lívia</h3>
                            <p>blablablablablabalblabalbalbal.</p>
                        </div>
                    </div>
                    <div className="member right">
                        <div className="info">
                            <h3>Rebeca</h3>
                            <p className="memberRight">blablablablablabalblabalbalbal.</p>
                        </div>
                        <img src="/img/icon-verde.png" alt="Integrante 2" />
                    </div>
                    <div className="member left">
                        <img src="/img/icon-verde.png" alt="Integrante 3" />
                        <div className="info">
                            <h3>Renan</h3>
                            <p>blablablablablabalblabalbalbal.</p>
                        </div>
                    </div>
                    <div className="member right">
                        <div className="info">
                            <h3>Sara</h3>
                            <p>blablablablablabalblabalbalbal.</p>
                        </div>
                        <img src="/img/icon-verde.png" alt="Integrante 4" />
                    </div>
                </section>
            </main>


            <Footer />

        </>

    )
}

export default SobreNos