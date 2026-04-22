export class Protocol {
    "protocol_id": string;
  "sponsor_id": string;
  "cro_id": string;
  "no_of_sites": number;
  "total_patients": number;
  "site_data": [
    {
      "site_id": string;
      "patient_count": string;
      "no_of_visits": string
    }
  ];
  "screening_kit_count": number;
  "screening_kit_lab_test_details": [
    {
      "lab_test_id": string;
      "frozen_status": string
    }
  ];
  "visit_kit_count": number;
  "visit_kit_type": string;
  "visit_kit_details": [
    {
      "no_of_visits": string;
      "kit_type": string;
      "lab_id": string
    }   
  ]
}

