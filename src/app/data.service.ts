import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apin } from './api';

@Injectable({ providedIn: 'root' })
export class DataService {

    constructor(private http: HttpClient) { }

    countryCodes = ["+1", "+7", "+20", "+27", "+30", "+31", "+32", "+33", "+34", "+36", "+39", 
    "+40", "+41", "+43", "+44", "+45", "+46", "+47", "+48", "+49", "+51", "+52", "+53", 
    "+54", "+55", "+56", "+57", "+58", "+60", "+61", "+62", "+63", "+64", "+65", "+66", "+77", 
    "+81", "+82", "+84", "+86", "+90", "+91", "+92", "+93", "+94", "+95", "+98", "+211", "+212", 
    "+213", "+216", "+218", "+220", "+221", "+222", "+223", "+224", "+225", "+226", "+227", "+228", 
    "+229", "+230", "+231", "+232", "+233", "+234", "+235", "+236", "+237", "+238", "+239", "+240", 
    "+241", "+242", "+243", "+244", "+245", "+246", "+248", "+249", "+250", "+251", "+252", "+253", 
    "+254", "+255", "+256", "+257", "+258", "+260", "+261", "+262", "+263", "+264", "+265", "+266", 
    "+267", "+268", "+269", "+290", "+291", "+297", "+298", "+299", "+345", "+350", "+351", "+352", 
    "+353", "+354", "+355", "+356", "+357", "+358", "+359", "+370", "+371", "+372", "+373", "+374", 
    "+375", "+376", "+377", "+378", "+379", "+380", "+381", "+382", "+385", "+386", "+387", "+389", 
    "+420", "+421", "+423", "+500", "+501", "+502", "+503", "+504", "+505", "+506", "+507", "+508", 
    "+509", "+590", "+591", "+593", "+594", "+595", "+596", "+597", "+598", "+599", "+670", "+672", 
    "+673", "+674", "+675", "+676", "+677", "+678", "+679", "+680", "+681", "+682", "+683", "+685", 
    "+686", "+687", "+688", "+689", "+690", "+691", "+692", "+850", "+852", "+853", "+855", "+856", 
    "+872", "+880", "+886", "+960", "+961", "+962", "+963", "+964", "+965", "+966", "+967", "+968", 
    "+970", "+971", "+972", "+973", "+974", "+975", "+976", "+977", "+992", "+993", "+994", "+995", 
    "+996", "+998", "+1242", "+1246", "+1264", "+1268", "+1284", "+1340", "+1441", "+1473", "+1649", 
    "+1664", "+1670", "+1671", "+1684", "+1758", "+1767", "+1784", "+1849", "+1868", "+1869", "+1876", 
    "+1939"]

    countries = [
        {
            "key": 0,
            "name": "Afghanistan"
        },
        {
            "key": 1,
            "name": "Albania"
        },
        {
            "key": 2,
            "name": "Algeria"
        },
        {
            "key": 3,
            "name": "American Samoa"
        },
        {
            "key": 4,
            "name": "Andorra"
        },
        {
            "key": 5,
            "name": "Angola"
        },
        {
            "key": 6,
            "name": "Anguilla"
        },
        {
            "key": 7,
            "name": "Antarctica"
        },
        {
            "key": 8,
            "name": "Antigua and Barbuda"
        },
        {
            "key": 9,
            "name": "Argentina"
        },
        {
            "key": 10,
            "name": "Armenia"
        },
        {
            "key": 11,
            "name": "Aruba"
        },
        {
            "key": 12,
            "name": "Australia"
        },
        {
            "key": 13,
            "name": "Austria"
        },
        {
            "key": 14,
            "name": "Azerbaijan"
        },
        {
            "key": 15,
            "name": "Bahamas"
        },
        {
            "key": 16,
            "name": "Bahrain"
        },
        {
            "key": 17,
            "name": "Bangladesh"
        },
        {
            "key": 18,
            "name": "Barbados"
        },
        {
            "key": 19,
            "name": "Belarus"
        },
        {
            "key": 20,
            "name": "Belgium"
        },
        {
            "key": 21,
            "name": "Belize"
        },
        {
            "key": 22,
            "name": "Benin"
        },
        {
            "key": 23,
            "name": "Bermuda"
        },
        {
            "key": 24,
            "name": "Bhutan"
        },
        {
            "key": 25,
            // "name": "Bolivia, Plurinational State of"
              "name": "Bolivia"
        },
        {
            "key": 26,
              // "name": "Bonaire, Sint Eustatius and Saba"
            "name": "Bonaire, Sint"
          
        },
        {
            "key": 27,
            "name": "Bosnia and Herzegovina"
        },
        {
            "key": 28,
            "name": "Botswana"
        },
        {
            "key": 29,
            "name": "Bouvet Island"
        },
        {
            "key": 30,
            "name": "Brazil"
        },
        {
            "key": 31,
            // "name": "British Indian Ocean Territory"
            "name": "British Indian Ocean"
        },
        {
            "key": 32,
            "name": "Brunei Darussalam"
        },
        {
            "key": 33,
            "name": "Bulgaria"
        },
        {
            "key": 34,
            "name": "Burkina Faso"
        },
        {
            "key": 35,
            "name": "Burundi"
        },
        {
            "key": 36,
            "name": "Cambodia"
        },
        {
            "key": 37,
            "name": "Cameroon"
        },
        {
            "key": 38,
            "name": "Canada"
        },
        {
            "key": 39,
            "name": "Cape Verde"
        },
        {
            "key": 40,
            "name": "Cayman Islands"
        },
        {
            "key": 41,
            "name": "Central African Republic"
        },
        {
            "key": 42,
            "name": "Chad"
        },
        {
            "key": 43,
            "name": "Chile"
        },
        {
            "key": 44,
            "name": "China"
        },
        {
            "key": 45,
            "name": "Christmas Island"
        },
        {
            "key": 46,
            "name": "Cocos (Keeling) Islands"
        },
        {
            "key": 47,
            "name": "Colombia"
        },
        {
            "key": 48,
            "name": "Comoros"
        },
        {
            "key": 49,
            "name": "Congo"
        },
        {
            "key": 50,
            // "name": "Congo, the Democratic Republic of the"
            "name": "Congo, the Democratic"
        },
        {
            "key": 51,
            "name": "Cook Islands"
        },
        {
            "key": 52,
            "name": "Costa Rica"
        },
        {
            "key": 53,
            "name": "Croatia"
        },
        {
            "key": 54,
            "name": "Cuba"
        },
        {
            "key": 55,
            "name": "Curaçao"
        },
        {
            "key": 56,
            "name": "Cyprus"
        },
        {
            "key": 57,
            "name": "Czech Republic"
        },
        {
            "key": 58,
            "name": "Côte d'Ivoire"
        },
        {
            "key": 59,
            "name": "Denmark"
        },
        {
            "key": 60,
            "name": "Djibouti"
        },
        {
            "key": 61,
            "name": "Dominica"
        },
        {
            "key": 62,
            "name": "Dominican Republic"
        },
        {
            "key": 63,
            "name": "Ecuador"
        },
        {
            "key": 64,
            "name": "Egypt"
        },
        {
            "key": 65,
            "name": "El Salvador"
        },
        {
            "key": 66,
            "name": "Equatorial Guinea"
        },
        {
            "key": 67,
            "name": "Eritrea"
        },
        {
            "key": 68,
            "name": "Estonia"
        },
        {
            "key": 69,
            "name": "Ethiopia"
        },
        {
            "key": 70,
            "name": "Falkland Islands (Malvinas)"
        },
        {
            "key": 71,
            "name": "Faroe Islands"
        },
        {
            "key": 72,
            "name": "Fiji"
        },
        {
            "key": 73,
            "name": "Finland"
        },
        {
            "key": 74,
            "name": "France"
        },
        {
            "key": 75,
            "name": "French Guiana"
        },
        {
            "key": 76,
            "name": "French Polynesia"
        },
        {
            "key": 77,
            "name": "French Southern Territories"
        },
        {
            "key": 78,
            "name": "Gabon"
        },
        {
            "key": 79,
            "name": "Gambia"
        },
        {
            "key": 80,
            "name": "Georgia"
        },
        {
            "key": 81,
            "name": "Germany"
        },
        {
            "key": 82,
            "name": "Ghana"
        },
        {
            "key": 83,
            "name": "Gibraltar"
        },
        {
            "key": 84,
            "name": "Greece"
        },
        {
            "key": 85,
            "name": "Greenland"
        },
        {
            "key": 86,
            "name": "Grenada"
        },
        {
            "key": 87,
            "name": "Guadeloupe"
        },
        {
            "key": 88,
            "name": "Guam"
        },
        {
            "key": 89,
            "name": "Guatemala"
        },
        {
            "key": 90,
            "name": "Guernsey"
        },
        {
            "key": 91,
            "name": "Guinea"
        },
        {
            "key": 92,
            "name": "Guinea-Bissau"
        },
        {
            "key": 93,
            "name": "Guyana"
        },
        {
            "key": 94,
            "name": "Haiti"
        },
        {
            "key": 95,
            // "name": "Heard Island and McDonald Islands"
            "name": "Heard Island"
        },
        {
            "key": 96,
            // "name": "Holy See (Vatican City State)"
             "name": "Holy See "
        },
        {
            "key": 97,
            "name": "Honduras"
        },
        {
            "key": 98,
            "name": "Hong Kong"
        },
        {
            "key": 99,
            "name": "Hungary"
        },
        {
            "key": 100,
            "name": "Iceland"
        },
        {
            "key": 101,
            "name": "India"
        },
        {
            "key": 102,
            "name": "Indonesia"
        },
        {
            "key": 103,
            "name": "Iran, Islamic Republic of"
        },
        {
            "key": 104,
            "name": "Iraq"
        },
        {
            "key": 105,
            "name": "Ireland"
        },
        {
            "key": 106,
            "name": "Isle of Man"
        },
        {
            "key": 107,
            "name": "Israel"
        },
        {
            "key": 108,
            "name": "Italy"
        },
        {
            "key": 109,
            "name": "Jamaica"
        },
        {
            "key": 110,
            "name": "Japan"
        },
        {
            "key": 111,
            "name": "Jersey"
        },
        {
            "key": 112,
            "name": "Jordan"
        },
        {
            "key": 113,
            "name": "Kazakhstan"
        },
        {
            "key": 114,
            "name": "Kenya"
        },
        {
            "key": 115,
            "name": "Kiribati"
        },
        {
            "key": 116,
            // "name": "Korea, Democratic People's Republic of"
              "name": "Korea"
        },
        {
            "key": 117,
            "name": "Korea, Republic of"
        },
        {
            "key": 118,
            "name": "Kuwait"
        },
        {
            "key": 119,
            "name": "Kyrgyzstan"
        },
        {
            "key": 120,
            // "name": "Lao People's Democratic Republic"
             "name": "Lao People's "
        },
        {
            "key": 121,
            "name": "Latvia"
        },
        {
            "key": 122,
            "name": "Lebanon"
        },
        {
            "key": 123,
            "name": "Lesotho"
        },
        {
            "key": 124,
            "name": "Liberia"
        },
        {
            "key": 125,
            "name": "Libya"
        },
        {
            "key": 126,
            "name": "Liechtenstein"
        },
        {
            "key": 127,
            "name": "Lithuania"
        },
        {
            "key": 128,
            "name": "Luxembourg"
        },
        {
            "key": 129,
            "name": "Macao"
        },
        {
            "key": 130,
            // "name": "Macedonia, The Former Yugoslav Republic of"
            "name": "Macedonia, The Former"
        },
        {
            "key": 131,
            "name": "Madagascar"
        },
        {
            "key": 132,
            "name": "Malawi"
        },
        {
            "key": 133,
            "name": "Malaysia"
        },
        {
            "key": 134,
            "name": "Maldives"
        },
        {
            "key": 135,
            "name": "Mali"
        },
        {
            "key": 136,
            "name": "Malta"
        },
        {
            "key": 137,
            "name": "Marshall Islands"
        },
        {
            "key": 138,
            "name": "Martinique"
        },
        {
            "key": 139,
            "name": "Mauritania"
        },
        {
            "key": 140,
            "name": "Mauritius"
        },
        {
            "key": 141,
            "name": "Mayotte"
        },
        {
            "key": 142,
            "name": "Mexico"
        },
        {
            "key": 143,
            // "name": "Micronesia, Federated States of"
            "name": "Micronesia, Federated"
        },
        {
            "key": 144,
            "name": "Moldova, Republic of"
        },
        {
            "key": 145,
            "name": "Monaco"
        },
        {
            "key": 146,
            "name": "Mongolia"
        },
        {
            "key": 147,
            "name": "Montenegro"
        },
        {
            "key": 148,
            "name": "Montserrat"
        },
        {
            "key": 149,
            "name": "Morocco"
        },
        {
            "key": 150,
            "name": "Mozambique"
        },
        {
            "key": 151,
            "name": "Myanmar"
        },
        {
            "key": 152,
            "name": "Namibia"
        },
        {
            "key": 153,
            "name": "Nauru"
        },
        {
            "key": 154,
            "name": "Nepal"
        },
        {
            "key": 155,
            "name": "Netherlands"
        },
        {
            "key": 156,
            "name": "New Caledonia"
        },
        {
            "key": 157,
            "name": "New Zealand"
        },
        {
            "key": 158,
            "name": "Nicaragua"
        },
        {
            "key": 159,
            "name": "Niger"
        },
        {
            "key": 160,
            "name": "Nigeria"
        },
        {
            "key": 161,
            "name": "Niue"
        },
        {
            "key": 162,
            "name": "Norfolk Island"
        },
        {
            "key": 163,
            "name": "Northern Mariana Islands"
        },
        {
            "key": 164,
            "name": "Norway"
        },
        {
            "key": 165,
            "name": "Oman"
        },
        {
            "key": 166,
            "name": "Pakistan"
        },
        {
            "key": 167,
            "name": "Palau"
        },
        {
            "key": 168,
            // "name": "Palestinian Territory, Occupied"
            "name": "Palestinian Territory"
        },
        {
            "key": 169,
            "name": "Panama"
        },
        {
            "key": 170,
            "name": "Papua New Guinea"
        },
        {
            "key": 171,
            "name": "Paraguay"
        },
        {
            "key": 172,
            "name": "Peru"
        },
        {
            "key": 173,
            "name": "Philippines"
        },
        {
            "key": 174,
            "name": "Pitcairn"
        },
        {
            "key": 175,
            "name": "Poland"
        },
        {
            "key": 176,
            "name": "Portugal"
        },
        {
            "key": 177,
            "name": "Puerto Rico"
        },
        {
            "key": 178,
            "name": "Qatar"
        },
        {
            "key": 179,
            "name": "Romania"
        },
        {
            "key": 180,
            "name": "Russian Federation"
        },
        {
            "key": 181,
            "name": "Rwanda"
        },
        {
            "key": 182,
            "name": "Réunion"
        },
        {
            "key": 183,
            "name": "Saint Barthélemy"
        },
        {
            "key": 184,
            // "name": "Saint Helena, Ascension and Tristan da Cunha"
              "name": "Saint Helena"
        },
        {
            "key": 185,
            "name": "Saint Kitts and Nevis"
        },
        {
            "key": 186,
            "name": "Saint Lucia"
        },
        {
            "key": 187,
            "name": "Saint Martin (French part)"
        },
        {
            "key": 188,
            "name": "Saint Pierre and Miquelon"
        },
        {
            "key": 189,
            // "name": "Saint Vincent and the Grenadines"
             "name": "Saint Vincent Grenadines"
        },
        {
            "key": 190,
            "name": "Samoa"
        },
        {
            "key": 191,
            "name": "San Marino"
        },
        {
            "key": 192,
            "name": "Sao Tome and Principe"
        },
        {
            "key": 193,
            "name": "Saudi Arabia"
        },
        {
            "key": 194,
            "name": "Senegal"
        },
        {
            "key": 195,
            "name": "Serbia"
        },
        {
            "key": 196,
            "name": "Seychelles"
        },
        {
            "key": 197,
            "name": "Sierra Leone"
        },
        {
            "key": 198,
            "name": "Singapore"
        },
        {
            "key": 199,
            "name": "Sint Maarten (Dutch part)"
        },
        {
            "key": 200,
            "name": "Slovakia"
        },
        {
            "key": 201,
            "name": "Slovenia"
        },
        {
            "key": 202,
            "name": "Solomon Islands"
        },
        {
            "key": 203,
            "name": "Somalia"
        },
        {
            "key": 204,
            "name": "South Africa"
        },
        {
            "key": 205,
            // "name": "South Georgia and the South Sandwich Islands"
            "name": "South Georgia"
        },
        {
            "key": 206,
            "name": "South Sudan"
        },
        {
            "key": 207,
            "name": "Spain"
        },
        {
            "key": 208,
            "name": "Sri Lanka"
        },
        {
            "key": 209,
            "name": "Sudan"
        },
        {
            "key": 210,
            "name": "Suriname"
        },
        {
            "key": 211,
            "name": "Svalbard and Jan Mayen"
        },
        {
            "key": 212,
            "name": "Swaziland"
        },
        {
            "key": 213,
            "name": "Sweden"
        },
        {
            "key": 214,
            "name": "Switzerland"
        },
        {
            "key": 215,
            "name": "Syrian Arab Republic"
        },
        {
            "key": 216,
            "name": "Taiwan, Province of China"
        },
        {
            "key": 217,
            "name": "Tajikistan"
        },
        {
            "key": 218,
            "name": "Tanzania, United Republic of"
        },
        {
            "key": 219,
            "name": "Thailand"
        },
        {
            "key": 220,
            "name": "Timor-Leste"
        },
        {
            "key": 221,
            "name": "Togo"
        },
        {
            "key": 222,
            "name": "Tokelau"
        },
        {
            "key": 223,
            "name": "Tonga"
        },
        {
            "key": 224,
            "name": "Trinidad and Tobago"
        },
        {
            "key": 225,
            "name": "Tunisia"
        },
        {
            "key": 226,
            "name": "Turkey"
        },
        {
            "key": 227,
            "name": "Turkmenistan"
        },
        {
            "key": 228,
            "name": "Turks and Caicos Islands"
        },
        {
            "key": 229,
            "name": "Tuvalu"
        },
        {
            "key": 230,
            "name": "Uganda"
        },
        {
            "key": 231,
            "name": "Ukraine"
        },
        {
            "key": 232,
            "name": "United Arab Emirates"
        },
        {
            "key": 233,
            "name": "United Kingdom"
        },
        {
            "key": 234,
            "name": "United States"
        },
        {
            "key": 235,
            // "name": "United States Minor Outlying Islands"
            "name": "United States Minor"
        },
        {
            "key": 236,
            "name": "Uruguay"
        },
        {
            "key": 237,
            "name": "Uzbekistan"
        },
        {
            "key": 238,
            "name": "Vanuatu"
        },
        {
            "key": 239,
            // "name": "Venezuela, Bolivarian Republic of"
            "name": "Venezuela, Bolivarian"
        },
        {
            "key": 240,
            "name": "Viet Nam"
        },
        {
            "key": 241,
            "name": "Virgin Islands, British"
        },
        {
            "key": 242,
            "name": "Virgin Islands, U.S."
        },
        {
            "key": 243,
            "name": "Wallis and Futuna"
        },
        {
            "key": 244,
            "name": "Western Sahara"
        },
        {
            "key": 245,
            "name": "Yemen"
        },
        {
            "key": 246,
            "name": "Zambia"
        },
        {
            "key": 247,
            "name": "Zimbabwe"
        },
        {
            "key": 248,
            "name": "Åland Islands"
        }
    ];

    getCountryCodes() {
        return this.countryCodes;
    }

    getCountries() {
        return this.countries;
    }

    getStates(states: any[]) {
        const statesObj = states.map((v: any, i: any) => {
            return {
                key: i,
                name: v
            };
        })
        return statesObj;
    }

    getAllStatesAPI(payload: { country: any; }, headers?: any) {
        return this.http.get(`${apin}/location/states?countries=${payload.country}`, { observe: 'response', headers });
    }

}