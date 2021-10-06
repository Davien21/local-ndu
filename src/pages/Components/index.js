import React, { useState } from "react";
import {
  DrugsSvg,
  FullLogoIcon,
  HalfLogoIcon,
  MicroChipSvg,
  HowItWorksIconA,
  HowItWorksIconB,
  HowItWorksIconC,
  HowItWorksIconD,
  SheildIcon,
  WarningIcon,
  TboltIcon,
} from "../../assets/";

import { InputWithButton } from "../../components/InputWithButton";
import { DashboardLayout } from "../../layouts";

import {
  Header,
  ActionBox,
  Input,
  MainButton,
  CameraDisplay,
  Footer,
  HowItWorksCard,
  HistoryCard,
  Modal,
} from "./../../components";

function Components(props) {
  const [displayModal, setdisplayModal] = useState(true);

  return (
    <>
      <Header />
      <main>
        <section id="input-box">
          <div className="container">
            <div className="my-10">
              <p className="mb-4">This is an Input box</p>
              <Input type="text" placeHolder="Drug name" />
            </div>
          </div>
        </section>
        <section id="input-with-button">
          <div className="container">
            <div className="mb-10">
              <p className="mb-4">This is an Input box with button</p>
              <InputWithButton />
            </div>
          </div>
        </section>
        <section id="main-button">
          <div className="container">
            <div className="mb-10">
              <p className="mb-4">This the main button</p>
              <MainButton buttonText="Scan barcode" />
            </div>
          </div>
        </section>
        <section id="logos">
          <div className="container">
            <div className="mb-10 py-4 flex flex-wrap gap-7 ">
              <div>
                <p className="mb-4">This is the Full Logo</p>
                <FullLogoIcon />
              </div>
              <div>
                <p className="mb-4">This is the Half Logo</p>
                <HalfLogoIcon />
              </div>
            </div>
          </div>
        </section>
        <section id="action-boxes">
          <div className="container">
            <div className="mb-10 py-4">
              <p className="mb-4">These are the Action Boxes</p>
              <div className="flex flex-wrap flex-1 gap-7">
                <div className="my-3">
                  <ActionBox title="Generate Hash" image={MicroChipSvg} />
                </div>
                <div className="my-3">
                  <ActionBox title="Drug Inventory" image={DrugsSvg} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="camera-display">
          <div className="container">
            <div className="my-10">
              <p className="mb-4">This is the Camera Display component</p>
              <CameraDisplay />
            </div>
          </div>
        </section>
        <section id="how-it-works-cards">
          <div className="container">
            {/* How it works cards */}
            <div className="py-8" style={{ width: "90%" }}>
              <p className="mb-4">These are the How It Works Cards</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                <div className="my-3">
                  <HowItWorksCard
                    Icon={HowItWorksIconA}
                    text={"Inscribe and ID a product with unique hash values."}
                  />
                </div>
                <div className="my-3">
                  <HowItWorksCard
                    Icon={HowItWorksIconB}
                    text={"Store hash values in blockchain."}
                  />
                </div>
                <div className="my-3">
                  <HowItWorksCard
                    Icon={HowItWorksIconC}
                    text={"Generate barcode with hash values."}
                  />
                </div>
                <div className="my-3">
                  <HowItWorksCard
                    Icon={HowItWorksIconD}
                    text={"Now you can verify product anywhere."}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="history-cards">
          <div className="container">
            {/* History cards */}
            <div className="py-4" style={{ width: "90%" }}>
              <p className="mb-4">These are the History Cards</p>
              <div className="">
                <div className="my-3">
                  <HistoryCard
                    Icon={SheildIcon}
                    headText={"Tetracycline capsule"}
                    subText={"Rema Pharmacy"}
                    date={"7 Jun, 21"}
                    type={"Original"}
                  />
                </div>
                <div className="my-3">
                  <HistoryCard
                    Icon={WarningIcon}
                    headText={"Tetracycline capsule"}
                    subText={"Rema Pharmacy"}
                    date={"7 Jun, 21"}
                    type={"Counterfiet"}
                  />
                </div>
                <div className="my-3">
                  <HistoryCard
                    Icon={TboltIcon}
                    headText={"Tetracycline capsule"}
                    subText={"Rema Pharmacy"}
                    date={"7 Jun, 21"}
                    type={"Expired"}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="modal">
          <div className="container">
            {/* Modal */}
            <Modal
              type="Original"
              displayModal={displayModal}
              closeModal={() => setdisplayModal(false)}
            >
              <div>
                <h1 className="text-center">Modal items go into here</h1>
                <h2 style={{ fontSize: "50px" }} className="text-center mt-5">
                  😎
                </h2>
              </div>
            </Modal>
          </div>
        </section>
        <section id="sidebar">
          <div className="hidden lg:block">
            <p className="py-4 container">
              These are the sidebars with all their kids
            </p>
            <DashboardLayout>
              <div className="">
                <div className="mt-20">
                  <span className="block">
                    Hello, This component was made by Chidi,
                  </span>
                  <span>Lead Front Engineer, NDU</span>
                </div>
              </div>
            </DashboardLayout>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export { Components };
