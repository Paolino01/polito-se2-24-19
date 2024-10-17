TEMPLATE FOR RETROSPECTIVE (Team 19)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done
  - Committed: 5
  - Done: 4

- Total points committed vs. done  
  - Committed: 16
  - Done: 11

- Nr of hours planned vs. spent (as a team)
  - Planned: 88h
  - Spent: 95h20m

**Remember**a story is done ONLY if it fits the Definition of Done:  
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!) 

### Detailed statistics

| Story            | # Tasks | Points | Hours est. | Hours actual |
|------------------|---------|--------|------------|--------------|
| _#0_             |    18   |        |   39h30m   |    38h40m    |
| Get a ticket     |    6    |    3   |   15h30m   |    17h10m    |
| Next Customer    |    4    |    5   |     9h     |      9h      |
| Call Customer    |    4    |    1   |     9h     |    11h30m    |
| See stats        |    2    |    5   |     9h     |    12h30m    |
| Config Counters  |    6    |    2   |     6h     |    6h30m     |
   

> story `#0` is for technical tasks, leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)  
  Estimated hours per task average: 2.2h  
  Standard deviation: 1.52h

  Actual hours per task average: 2.38h  
  Standard deviation: 2.00h

- Total estimation error ratio: sum of total hours spent / sum of total hours effort - 1

    $$\frac{\sum_i spent_{task_i}}{\sum_i estimation_{task_i}} - 1 = \frac{88}{95.33} - 1 = -0.07 $$
    
- Absolute relative task estimation error: sum( abs( spent-task-i / estimation-task-i - 1))/n

    $$\frac{1}{n}\sum_i^n \left| \frac{spent_{task_i}}{estimation_task_i}-1 \right| = \frac{1}{40} \left| \frac{88}{95.33} - 1 \right| = 0.00175 $$
  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: 0h
  - Total hours spent: 0h
  - Nr of automated unit test cases: 0
  - Coverage (if available)  
> Note: we did NOT perform any unit testing
- E2E testing:
  - Total hours estimated: 4h  
  - Total hours spent: 5h50m
- Code review:
  - Total hours estimated: 3h
  - Total hours spent: 2h30m
  
## ASSESSMENT

- What caused your errors in estimation (if any)?  
  We underestimated the time needed for some tasks (like the "See stats" one), and we did not take into account the testing.

- What lessons did you learn (both positive and negative) in this sprint?  
  - We should estimate all the 96 hours at the beginning of each sprint, and we should also take both unit and integration testing into account.
  - Communicate any problems encountered in good time.

- Which improvement goals set in the previous retrospective were you able to achieve?  
  Not applicable, this is the first retrospective
  
- Which ones you were not able to achieve? Why?  
  Not applicable, this is the first retrospective

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)  
  > Propose one or two
  - Better initial communication between front-end and back-end teams to define the structure needed in order to work independently on each task assigned.
  - Better workload distribution in order not to rush on the last days. This could be achieved with a better Sprint and personal planning.  

- One thing you are proud of as a Team!!  
Good synergy between members.
