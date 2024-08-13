class ModbusModel {
  constructor(data) {
    this.talis_id = data.talis_id;
    this.pcb_barcode = data.pcb_barcode;
    this.sn_code = data.sn_code;
    this.slave_id = data.slave_id;
    this.voltage = parseFloat((data.voltage * 0.01).toFixed(2));
    this.current = parseFloat((data.current * 0.1).toFixed(2));
    this.remaining_capacity = parseFloat(data.remaining_capacity.toFixed(2));
    this.average_cell_temperature = parseFloat(
      (data.average_cell_temperature * 0.1).toFixed(2)
    );
    this.warning_flag = data.warning_flag;
    this.protection_flag = data.protection_flag;
    this.fault_status_flag = data.fault_status_flag;
    this.soc = parseFloat((data.soc * 0.01).toFixed(2));
    this.soh = parseFloat((data.soh * 0.01).toFixed(2));
    this.full_charged_cap = parseFloat(data.full_charged_cap.toFixed(2));
    this.cycle_count = data.cycle_count;
    this.cell_voltage_1 = data.cell_voltage_1;
    this.cell_voltage_2 = data.cell_voltage_2;
    this.cell_voltage_3 = data.cell_voltage_3;
    this.cell_voltage_4 = data.cell_voltage_4;
    this.cell_voltage_5 = data.cell_voltage_5;
    this.cell_voltage_6 = data.cell_voltage_6;
    this.cell_voltage_7 = data.cell_voltage_7;
    this.cell_voltage_8 = data.cell_voltage_8;
    this.cell_voltage_9 = data.cell_voltage_9;
    this.cell_voltage_10 = data.cell_voltage_10;
    this.cell_voltage_11 = data.cell_voltage_11;
    this.cell_voltage_12 = data.cell_voltage_12;
    this.cell_voltage_13 = data.cell_voltage_13;
    this.cell_voltage_14 = data.cell_voltage_14;
    this.cell_voltage_15 = data.cell_voltage_15;
    this.cell_voltage_16 = data.cell_voltage_16;
    this.max_cell_voltage = data.max_cell_voltage;
    this.min_cell_voltage = data.min_cell_voltage;
    this.cell_voltage_diff = data.cell_voltage_diff;
    this.max_cell_temperature = parseFloat(
      (data.max_cell_temperature * 0.1).toFixed(2)
    );
    this.min_cell_temperature = parseFloat(
      (data.min_cell_temperature * 0.1).toFixed(2)
    );
    this.fet_temperature = parseFloat((data.fet_temperature * 0.1).toFixed(2));
    this.cell_temperature_1 = parseFloat(
      (data.cell_temperature_1 * 0.1).toFixed(2)
    );
    this.cell_temperature_2 = parseFloat(
      (data.cell_temperature_2 * 0.1).toFixed(2)
    );
    this.cell_temperature_3 = parseFloat(
      (data.cell_temperature_3 * 0.1).toFixed(2)
    );
    this.cell_temperature_4 = parseFloat(
      (data.cell_temperature_4 * 0.1).toFixed(2)
    );
    this.ambient_temperature = parseFloat(
      (data.ambient_temperature * 0.1).toFixed(2)
    );
    this.remaining_charge_time = data.remaining_charge_time;
    this.remaining_discharge_time = data.remaining_discharge_time;
  }
}

export default ModbusModel;
