
interface IProps {
  className?: string;
}

export function FilterIcon({ className }: IProps) {
  return (
    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11 9.75C16.3848 9.75 20.75 7.73528 20.75 5.25C20.75 2.76472 16.3848 0.75 11 0.75C5.61522 0.75 1.25 2.76472 1.25 5.25C1.25 7.73528 5.61522 9.75 11 9.75Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M1.25 5.25C1.25253 9.76548 4.35614 13.688 8.75 14.729V21C8.75 22.2426 9.75736 23.25 11 23.25C12.2426 23.25 13.25 22.2426 13.25 21V14.729C17.6439 13.688 20.7475 9.76548 20.75 5.25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}

export function SmsIcon({ className }: IProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1113_1854)">
        <path d="M8 0.666504C3.77467 0.666504 0 3.48384 0 7.33784C0 8.7045 0.492667 10.0465 1.36467 11.0878C1.40133 12.3078 0.682667 14.0585 0.036 15.3332C1.77067 15.0198 4.23667 14.3278 5.35467 13.6425C11.512 15.1405 16 11.3725 16 7.33784C16 3.46317 12.1993 0.666504 8 0.666504ZM4.66667 8.33317C4.114 8.33317 3.66667 7.88584 3.66667 7.33317C3.66667 6.7805 4.114 6.33317 4.66667 6.33317C5.21933 6.33317 5.66667 6.7805 5.66667 7.33317C5.66667 7.88584 5.21933 8.33317 4.66667 8.33317ZM8 8.33317C7.44733 8.33317 7 7.88584 7 7.33317C7 6.7805 7.44733 6.33317 8 6.33317C8.55267 6.33317 9 6.7805 9 7.33317C9 7.88584 8.55267 8.33317 8 8.33317ZM11.3333 8.33317C10.7813 8.33317 10.3333 7.88584 10.3333 7.33317C10.3333 6.7805 10.7813 6.33317 11.3333 6.33317C11.886 6.33317 12.3333 6.7805 12.3333 7.33317C12.3333 7.88584 11.886 8.33317 11.3333 8.33317Z" fill="#14ACA4" />
      </g>
      <defs>
        <clipPath id="clip0_1113_1854">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function PhoneIcon({ className }: IProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.3334 15.0807L8.98602 10.5507C8.98069 10.5533 7.67002 11.1973 7.61002 11.2247C6.11669 11.9487 3.07736 6.01133 4.53736 5.22867L5.92602 4.54467L3.59736 0L2.19336 0.692667C-2.60798 3.196 5.01536 18.014 9.92669 15.7693C10.0074 15.7327 11.328 15.0833 11.3334 15.0807Z" fill="#14ACA4" />
    </svg>
  );
}

export function VideoCallIcon({ className }: IProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.6667 9.99984C10.6667 10.7358 10.0693 11.3332 9.33333 11.3332H1.33333C0.596667 11.3332 0 10.7358 0 9.99984V1.99984C0 1.26384 0.596667 0.666504 1.33333 0.666504H9.33333C10.0693 0.666504 10.6667 1.26384 10.6667 1.99984V9.99984ZM16 0.666504L12 4.81517V7.1845L16 11.3332V0.666504Z" fill="#14ACA4" />
    </svg>
  );
}

export function MessageIcon({ className }: IProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 6.47533L0.01 0H15.99L8 6.47533ZM8 8.19133L0 1.708V12H16V1.708L8 8.19133Z" fill="#14ACA4" />
    </svg>

  );
}


