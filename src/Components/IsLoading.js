import { InfinitySpin } from "react-loader-spinner";

export function IsLoading() {
  return (
    <div className="loader">
      <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
}
