export type WarningSeverity = "low" | "medium" | "high";

export interface WarningItem {
  id: string;
  source: string;
  message: string;
  severity: WarningSeverity;
}

export interface ZonePowerItem {
  zoneName: string;
  totalPower: number;
  percentage: number;
}

export interface CrossTilePowerAlerts {
  chickenCoop?: {
    temperatureSystemOffline?: boolean;
    ventilationFailure?: boolean;
    lightingSystemInactive?: boolean;
    highPowerDemand?: boolean;
  };
  cropFarm?: {
    irrigationInactive?: boolean;
    highPowerDemand?: boolean;
    lowPowerAffectingOperations?: boolean;
  };
  waterDistribution?: {
    pumpNotOperating?: boolean;
    lowWaterFlowDueToPower?: boolean;
    highPowerDemand?: boolean;
  };
}

export interface PowerWarningInputs {
  batteryLevel: number;
  latestSolarPower: number;
  latestPowerOut: number;
  zonePowerData?: ZonePowerItem[];
  crossTileAlerts?: CrossTilePowerAlerts;
}

export function generatePowerWarnings({
  batteryLevel,
  latestSolarPower,
  latestPowerOut,
  zonePowerData = [],
  crossTileAlerts,
}: PowerWarningInputs): WarningItem[] {
  const warnings: WarningItem[] = [];

  // Power tile warnings - KEEPING battery and solar warnings only
  
  // Battery warnings
  if (batteryLevel <= 20) {
    warnings.push({
      id: "power-battery-low",
      source: "Power Tile",
      message: "Battery level is critically low.",
      severity: "high",
    });
  } else if (batteryLevel <= 40) {
    warnings.push({
      id: "power-battery-warning",
      source: "Power Tile",
      message: "Battery level is getting low.",
      severity: "medium",
    });
  }

  // Solar power warnings
  if (latestSolarPower <= 0) {
    warnings.push({
      id: "power-no-solar",
      source: "Power Tile",
      message: "No solar power is currently being generated.",
      severity: "high",
    });
  } else if (latestSolarPower < 0.8) {
    warnings.push({
      id: "power-low-solar",
      source: "Power Tile",
      message: "Solar power generation is very low.",
      severity: "medium",
    });
  }

  // Power demand warning (comparing solar supply vs demand)
  if (latestPowerOut > latestSolarPower) {
    const difference = latestPowerOut - latestSolarPower;

    warnings.push({
      id: "power-demand-high",
      source: "Power Tile",
      message: `Power demand is higher than solar supply by ${difference.toFixed(2)} Wh.`,
      severity: difference > 20 ? "high" : "medium",
    });
  }

  return warnings;
}