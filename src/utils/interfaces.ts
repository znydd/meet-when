
export interface CourseRoutine {
    courseCode: string;
    courseDay: "SAT-MON" | "SUN-TUE" | "MON-WED" | "TUE-THU" | "THU-SAT";
    courseSlot: "08:00-09:20" | "09:30-10:50" | "11:00-12:20" | "12:30-01:50" | "02:00-03:20" | "03:30-04:50"
    hasLab: boolean
    labDay?: "SAT" | "SUN" | "MON" | "TUE" | "WED" | "THU"
    labTime?: "08:00-10:50" | "11:00-01:50" | "02:00-04:50"
}

export interface Person {
    id?: number;
    name: string;
    course1: CourseRoutine;
    course2: CourseRoutine;
    course3: CourseRoutine;
    course4: CourseRoutine;
}
