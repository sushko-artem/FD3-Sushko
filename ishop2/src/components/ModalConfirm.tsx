import React, { Component } from "react";

type ModalPropType = {
  confirmAction: (res: boolean) => void;
  modalText: string;
};

export default class ModalConfirm extends Component<ModalPropType> {
  render(): React.ReactNode {
    const { confirmAction, modalText } = this.props;
    return (
      <div className="fixed inset-0 z-10 backdrop-blur-[4px] flex flex-col animate-blure transition-all">
        <section className="m-auto w-[60%] md:w-80 border-2 rounded-lg p-4 bg-[#0093e3] animate-appearing transition-all">
          <h1 className="text-2xl text-center text-violet-900 font-extrabold">
            {modalText}
          </h1>
          <div className="mt-4 flex justify-around">
            <div
              onClick={() => confirmAction(true)}
              className="w-10 flex cursor-pointer hover:drop-shadow-lg hover:scale-125  transition-all"
            >
              <img
                src="/images/check.png"
                alt="confirm"
                title="Yes!"
                width={100}
              />
            </div>
            <div
              onClick={() => confirmAction(false)}
              className="w-10 flex cursor-pointer hover:drop-shadow-lg hover:scale-125 transition-all"
            >
              <img
                src="/images/cross.webp"
                alt="deny"
                title="No!"
                width={100}
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}
