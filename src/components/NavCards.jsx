function NavCards({props}) {
  return (
    <div className={`rounded-lg bg-gradient-to-tl from-${props.bottom}-500 to-${props.top}-500`}>
        <div className="h-1/4 w-3/4">
            {props.child}
        </div>
    </div>
  );
}

export default NavCards;