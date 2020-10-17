import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Portal from './Portal'
import ImgSlider from './ImgSlider'
function Modal({
    className,
    onClose,
    maskClosable,
    closable,
    visible,
    children,
    bgColor,
}) {
    const onMaskClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose(e)
        }
    }

    const close = (e) => {
        if (onClose) {
            onClose(e)
        }
    }

    // useEffect(() => {
    //     document.body.style.cssText = `position: fixed; top: -${window.scrollY}px; width:100%;`
    //     return () => {
    //         const scrollY = document.body.style.top
    //         document.body.style.cssText = `position: ""; top: "";`
    //         window.scrollTo(0, parseInt(scrollY || '0') * -1)
    //     }
    // }, [])
    return (
        <Portal selector="#modal">
            <ModalOverlay visible={visible} bgColor={bgColor} />
            <ModalWrapper
                className={className}
                onClick={maskClosable ? onMaskClick : null}
                tabIndex="-1"
                visible={visible}
            >
                <ModalInner tabIndex="0" className="modal-inner bordernone">
                    {closable && (
                        <button className="modal-close close" onClick={close}>
                            close
                        </button>
                    )}
                    {/* {children}
                     */}
                    {/* {console.log(children)} */}
                    {children.name}
                    <ImgSlider images={children.Images} />
                </ModalInner>
            </ModalWrapper>
        </Portal>
    )
}

Modal.propTypes = {
    visible: PropTypes.bool,
}

const ModalWrapper = styled.div`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    overflow: auto;
    outline: 0;
`

const ModalOverlay = styled.div`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: ${(props) =>
        props.bgColor ? props.bgColor : 'rgba(0, 0, 0, 0.6)'};
    z-index: 999;
`

const ModalInner = styled.div`
    box-sizing: border-box;
    position: relative;
    max-width: 1000px;
    max-height: 90vh;
    overflow-y: scroll;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
    background-color: #fff;
    border-radius: 10px;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    padding: 40px 20px;
`

export default Modal
