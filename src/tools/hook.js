class HookAPI {
  GetInfoProject() {
    return {
      status: true,
      etherAddress: "0xa51deR17DGE4j345RQj3qfvn39sREGZ497DCbA",
      projectType: "Manure management",
      location: "40 Phan Boi Chau, P. Cua Nam, Q. Hoan Kiem, Hanoi, Vietnam",
    };
  }
  GetMarker() {
    return [
      {
        type: "Feature",
        properties: {
          message: "40 Pbc",
          iconSize: 40,
        },
        geometry: {
          type: "Point",
          coordinates: [105.8425738, 21.0244531],
        },
      },
      {
        type: "Feature",
        properties: {
          message: "34 HBT",
          iconSize: 50,
        },
        geometry: {
          type: "Point",
          coordinates: [105.8498146, 21.0246805],
        },
      },
      {
        type: "Feature",
        properties: {
          message: "513 NH, QNgai",
          iconSize: 40,
        },
        geometry: {
          type: "Point",
          coordinates: [108.8245034, 15.0844983],
        },
      },
    ];
  }
  GetMyMap(state) {
    return state?.customization?.mymap;
  }
  /**
   *
   * @param {object} state
   * @returns {{
   * mymap : object,
   * idFeature : number
   * }}
   */
  GetCustomState(state) {
    return state?.customization;
  }
  /**
   * @param {object} state
   * @returns {{
   * iot: {
   *   id: Number,
   *   project: Number,
   *   address: Number,
   *   type: Number,
   *   status: Number,
   *   position: { lat : Number, lng : Number}
   * },
   * iot_minted : [{
   *   "amount": string,
   *   "createdAt": string,
   *   "id": Number,
   *   "iot": string,
   *   "nonce": Number,
   *   "r": string,
   *   "s": string,
   *   "updatedAt": string,
   *   "v": string
   * }],
   * latest : string,
   * loading : boolean,
   * error : string,
   * error_code : string
   * }}
   */
  GetIOTState(state) {
    return state?.iotState;
  }

  /**
   *
   * @param {*} amount
   * @returns {{
   * project : {
   * id: number,
   * owner: string,
   * status: number,
   * location: any,
   * images: [{
   *  id : number,
   *  projectId : number,
   *  image : string,
   *  createdAt : string,
   * }],
   * createdAt: string,
   * updatedAt: string,
   * }
   * loading : boolean,
   * error : string,
   * error_code : string
   * }}
   *
   */
  GetProjectState(state) {
    return state?.projectState;
  }
  /**
   *
   * @param {*} amount
   * @returns {{
   * metric : {
   *  id: number,
   *  metrics:: [{
   *    id : number,
   *    latest : number,
   *    metric : {
   *      lat : number,
   *      lng : number,
   *      value: number
   *    },
   *  }],
   * }
   * loading : boolean,
   * error : string,
   * error_code : string
   * }}
   *
   */
  GetOperatorState(state) {
    return state?.operatorState;
  }
  ConfigSeries(amount, type, time) {
    let listAmount = [];

    switch (type) {
      case 0: // 1 week
        for (let index = 0; index < 7; index++) {
          const newTime = new Date(time);
          if (index < 6) {
            const scale = (Math.random() * amount) / 10;
            const newAmount = amount - scale;
            listAmount[index] = {
              amount: newAmount,
              time: newTime.setUTCDate(newTime.getUTCDate() - 1),
            };
          } else {
            listAmount[index] = {
              amount,
              time: newTime,
            };
          }
        }

        break;

      default:
        break;
    }
    return listAmount;
  }
}
export default HookAPI;
