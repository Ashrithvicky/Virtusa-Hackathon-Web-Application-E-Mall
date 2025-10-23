package com.example.EMPM.dto;

public class SalesSummary {

    private double monthly;
    private double weekly;

    public SalesSummary() {}

    public SalesSummary(double monthly, double weekly) {
        this.monthly = monthly;
        this.weekly = weekly;
    }

    public double getMonthly() {
        return monthly;
    }

    public void setMonthly(double monthly) {
        this.monthly = monthly;
    }

    public double getWeekly() {
        return weekly;
    }

    public void setWeekly(double weekly) {
        this.weekly = weekly;
    }
} 
