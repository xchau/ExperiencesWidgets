
import { h, Component, createRef } from "preact";
import "./_modal.scss";

type ModalProps = {
    /** sets the prop if the mobal should be visiable or not */
    showModal: boolean;
    /** sets the prop if the mobal is at the order details portion */
    orderDetails: string;
    /** method to will trigger when to close the modal view */
    closeModal(): void;
};

type ModalState = {
};
/** this componet renders the modal view  */
export class Modal extends Component<ModalProps, ModalState> {
    constructor(props: ModalProps) {
        super(props);
    }

    /** Ref to the modal element */
    modal = createRef();

    /** Add event listener to the document for clicks */
    componentWillMount() {
        document.addEventListener("mousedown", this.handleClickOutsideModal, false);
    }

    /** On click, check if click was outside modal and close if so */
    handleClickOutsideModal = (e: Event) => {
        if (!!this.modal.current) {
            if (this.modal.current.contains(e.target as Node)) {
                return;
            }
        }
        this.props.closeModal();
    }

    /** rendering the modal container */
    render() {
        if (this.props.showModal) {
            const { children, orderDetails } = this.props;
            let orderModal = (orderDetails === "OrderDetails") ? true : false;

            return (
                <div>
                    <div class="Modal">
                        <div ref={this.modal} class={`Modal__ModalContentBox${!!orderModal ? "OrderDetails" : ""}`}>
                            <div class="Modal-ModalMainContentBox">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}