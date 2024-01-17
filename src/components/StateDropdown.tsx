import { IStateDropdownProps, States } from "../types";
import { handleChange } from "../helpers";

export const StateDropdown: React.FC<IStateDropdownProps> = ({
  client,
  setState,
  setClientValidation,
}) => {
  return (
    <div>
      <label htmlFor="state">State:</label>
      <select
        id="state"
        name="state"
        onChange={(e) => handleChange(e, setState, setClientValidation)}
        value={client.state}
      >
        <option value={States.AL}>AL</option>
        <option value={States.AK}>AK</option>
        <option value={States.AZ}>AZ</option>
        <option value={States.AR}>AR</option>
        <option value={States.CA}>CA</option>
        <option value={States.CO}>CO</option>
        <option value={States.CT}>CT</option>
        <option value={States.DE}>DE</option>
        <option value={States.FL}>FL</option>
        <option value={States.GA}>GA</option>
        <option value={States.HI}>HI</option>
        <option value={States.ID}>ID</option>
        <option value={States.IL}>IL</option>
        <option value={States.IN}>IN</option>
        <option value={States.IA}>IA</option>
        <option value={States.KS}>KS</option>
        <option value={States.KY}>KY</option>
        <option value={States.LA}>LA</option>
        <option value={States.ME}>ME</option>
        <option value={States.MD}>MD</option>
        <option value={States.MA}>MA</option>
        <option value={States.MI}>MI</option>
        <option value={States.MN}>MN</option>
        <option value={States.MS}>MS</option>
        <option value={States.MO}>MO</option>
        <option value={States.MT}>MT</option>
        <option value={States.NE}>NE</option>
        <option value={States.NV}>NV</option>
        <option value={States.NH}>NH</option>
        <option value={States.NJ}>NJ</option>
        <option value={States.NM}>NM</option>
        <option value={States.NY}>NY</option>
        <option value={States.NC}>NC</option>
        <option value={States.ND}>ND</option>
        <option value={States.OH}>OH</option>
        <option value={States.OK}>OK</option>
        <option value={States.OR}>OR</option>
        <option value={States.PA}>PA</option>
        <option value={States.RI}>RI</option>
        <option value={States.SC}>SC</option>
        <option value={States.SD}>SD</option>
        <option value={States.TN}>TN</option>
        <option value={States.TX}>TX</option>
        <option value={States.UT}>UT</option>
        <option value={States.VT}>VT</option>
        <option value={States.VA}>VA</option>
        <option value={States.WA}>WA</option>
        <option value={States.WV}>WV</option>
        <option value={States.WI}>WI</option>
        <option value={States.WY}>WY</option>
      </select>
    </div>
  );
};
