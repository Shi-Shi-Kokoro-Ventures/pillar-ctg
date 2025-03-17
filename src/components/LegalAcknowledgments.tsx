
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Shield, FileText, AlertTriangle } from "lucide-react";

interface LegalAcknowledgmentsProps {
  value: {
    privacyPolicy: boolean;
    nonDiscrimination: boolean;
    appealProcess: boolean;
    dataSharing: boolean;
    rightToWithdraw: boolean;
  };
  onChange: (values: any) => void;
  className?: string;
}

const LegalAcknowledgments: React.FC<LegalAcknowledgmentsProps> = ({
  value,
  onChange,
  className
}) => {
  const handleChange = (field: string, checked: boolean) => {
    onChange({ ...value, [field]: checked });
  };

  return (
    <div className={`space-y-5 ${className}`}>
      <div className="flex items-center">
        <Shield className="h-5 w-5 mr-2 text-redcross" />
        <h2 className="text-xl font-semibold text-gray-800">Your Rights & Legal Acknowledgments</h2>
      </div>
      
      <div className="p-5 bg-gray-50 rounded-md border border-gray-200 space-y-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Your Rights as an Applicant</h3>
            <ul className="text-sm text-gray-700 space-y-2 list-disc pl-4">
              <li>You have the right to be treated with dignity and respect.</li>
              <li>You have the right to confidentiality regarding your personal information.</li>
              <li>You have the right to receive assistance without discrimination based on race, color, national origin, religion, sex, familial status, disability, or age.</li>
              <li>You have the right to appeal decisions regarding your application.</li>
              <li>You have the right to request reasonable accommodations for disabilities.</li>
              <li>You have the right to receive clear information about the assistance program requirements and your responsibilities.</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-md transition-colors">
          <Checkbox
            id="privacyPolicy"
            checked={value.privacyPolicy}
            onCheckedChange={(checked) => handleChange("privacyPolicy", checked === true)}
            className="mt-1 data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
          />
          <div>
            <Label htmlFor="privacyPolicy" className="font-medium flex items-center">
              Privacy Policy <span className="text-red-500 ml-1">*</span>
            </Label>
            <p className="text-sm text-gray-600 mt-1">
              I acknowledge that I have been informed about how my personal information will be collected, used, stored, and protected. I understand that my information will be kept confidential and used only for the purposes of processing my assistance application and for required reporting to funding sources.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-md transition-colors">
          <Checkbox
            id="nonDiscrimination"
            checked={value.nonDiscrimination}
            onCheckedChange={(checked) => handleChange("nonDiscrimination", checked === true)}
            className="mt-1 data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
          />
          <div>
            <Label htmlFor="nonDiscrimination" className="font-medium flex items-center">
              Non-Discrimination Statement <span className="text-red-500 ml-1">*</span>
            </Label>
            <p className="text-sm text-gray-600 mt-1">
              I acknowledge that this organization provides equal opportunity to all individuals seeking assistance regardless of race, color, religion, sex, age, national origin, disability, sexual orientation, gender identity, familial status, or any other protected characteristic.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-md transition-colors">
          <Checkbox
            id="appealProcess"
            checked={value.appealProcess}
            onCheckedChange={(checked) => handleChange("appealProcess", checked === true)}
            className="mt-1 data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
          />
          <div>
            <Label htmlFor="appealProcess" className="font-medium flex items-center">
              Appeal Process Acknowledgment <span className="text-red-500 ml-1">*</span>
            </Label>
            <p className="text-sm text-gray-600 mt-1">
              I understand that if my application for assistance is denied, I have the right to appeal the decision within 14 days by submitting a written request for reconsideration. I will be notified of the final decision within 30 days of submitting my appeal.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-md transition-colors">
          <Checkbox
            id="dataSharing"
            checked={value.dataSharing}
            onCheckedChange={(checked) => handleChange("dataSharing", checked === true)}
            className="mt-1 data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
          />
          <div>
            <Label htmlFor="dataSharing" className="font-medium flex items-center">
              Data Sharing Authorization <span className="text-red-500 ml-1">*</span>
            </Label>
            <p className="text-sm text-gray-600 mt-1">
              I authorize this organization to share my information with partner agencies, government entities, and funders as necessary to process my application, coordinate services, and comply with reporting requirements. I understand that my personal identifiers will be protected according to applicable privacy laws.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-md transition-colors">
          <Checkbox
            id="rightToWithdraw"
            checked={value.rightToWithdraw}
            onCheckedChange={(checked) => handleChange("rightToWithdraw", checked === true)}
            className="mt-1 data-[state=checked]:bg-redcross data-[state=checked]:border-redcross"
          />
          <div>
            <Label htmlFor="rightToWithdraw" className="font-medium flex items-center">
              Right to Withdraw <span className="text-red-500 ml-1">*</span>
            </Label>
            <p className="text-sm text-gray-600 mt-1">
              I understand that I have the right to withdraw my application at any time by providing written notice. I also understand that I may revoke any authorization for information sharing at any time, except to the extent that action has already been taken based on my previous authorization.
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-l-4 border-blue-500 bg-blue-50 text-blue-800 text-sm rounded-r-md">
        <div className="flex items-start">
          <FileText className="h-5 w-5 mr-2 flex-shrink-0" />
          <div>
            <p className="font-medium mb-1">Important Note</p>
            <p>The demographic information collected in this application (such as race, gender, ethnicity, disability status) is used solely for statistical and reporting purposes as required by our funders. Providing this information is completely voluntary and will not affect your eligibility for assistance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalAcknowledgments;
