import React from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Avatar from 'avataaars'

function SobreNos() {
    return (
        <>

            <Navbar />

        <h2>Sobre nós</h2>

            <div className="container-cards">
                <div className="card">
                    <Avatar
                        avatarStyle='Transparent'
                        topType='LongHairCurly'
                        accessoriesType='Prescription01'
                        hairColor='BrownDark'
                        facialHairType='Blank'
                        clotheType='ShirtVNeck'
                        clotheColor='White'
                        eyeType='Happy'
                        eyebrowType='Default'
                        mouthType='Default'
                        skinColor='Pale'
                    />
                    <h4 className="titulo-sobre-nos">Lívia</h4>
                    <div className="container">
                        <p className="textoCard">
                            
                        </p>
                    </div>
                </div>
                <div className="card">
                    <Avatar
                        avatarStyle='Transparent'
                        topType='LongHairCurly'
                        accessoriesType='Prescription02'
                        hairColor='BrownDark'
                        facialHairType='Blank'
                        clotheType='ShirtVNeck'
                        clotheColor='PastelGreen'
                        eyeType='Happy'
                        eyebrowType='Default'
                        mouthType='Default'
                        skinColor='Pale'
                    />
                    <h4 className="titulo-sobre-nos">Rebeca</h4>
                    <div className="container" >
                        <p className="textoCard">
                        </p>
                    </div>
                </div>
                <div className="card">
                    <Avatar
                        avatarStyle='Transparent'
                        topType='ShortHairShortWaved'
                        accessoriesType='Blank'
                        hairColor='BrownDark'
                        facialHairType='Blank'
                        clotheType='GraphicShirt'
                        clotheColor='Black'
                        graphicType='Skull'
                        eyeType='Happy'
                        eyebrowType='Default'
                        mouthType='Default'
                        skinColor='Pale'
                    />
                    <h4 className="titulo-sobre-nos">Renan</h4>
                    <div className="container">
                        <p className="textoCard">
                        </p>
                    </div>
                </div>

                <div className="card">
                    <Avatar
                        avatarStyle='Transparent'
                        topType='LongHairStraight'
                        accessoriesType='Round'
                        hairColor='Brown'
                        facialHairType='Blank'
                        clotheType='Hoodie'
                        clotheColor='Pink'
                        eyeType='Happy'
                        eyebrowType='Default'
                        mouthType='Default'
                        skinColor='Pale'
                    />
                    <h4 className="titulo-sobre-nos">Sara</h4>
                    <div className="container">
                        <p className="textoCard">
                        </p>
                    </div>
                </div>
            </div>

            <Footer />

        </>

    )
}

export default SobreNos