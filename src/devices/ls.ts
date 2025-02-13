import * as exposes from '../lib/exposes';
import {light} from '../lib/modernExtend';
import {DefinitionWithExtend} from '../lib/types';

const e = exposes.presets;

const definitions: DefinitionWithExtend[] = [
    {
        zigbeeModel: ['Emotion'],
        model: 'A319463',
        vendor: 'LS Deutschland GmbH',
        description: 'Home base',
        fromZigbee: light({colorTemp: {range: [153, 454]}, color: true}).fromZigbee,
        toZigbee: light({colorTemp: {range: [153, 454]}, color: true}).toZigbee,
        configure: light({colorTemp: {range: [153, 454]}, color: true}).configure[0],
        exposes: (device, options) => {
            if (!device) return [e.light_brightness_colortemp_colorxy([153, 454])];
            return [
                ...device.endpoints
                    .filter((ep) => ep.ID !== 242)
                    .map((ep) => {
                        return e.light_brightness_colortemp_colorxy([153, 454]).withEndpoint(`l${ep.ID}`);
                    }),
            ];
        },
        meta: {multiEndpoint: true},
        endpoint: (device) => {
            return Object.fromEntries(device.endpoints.filter((ep) => ep.ID !== 242).map((ep) => [`l${ep.ID}`, ep.ID]));
        },
    },
];

export default definitions;
module.exports = definitions;
