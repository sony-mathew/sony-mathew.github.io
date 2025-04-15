---
title: 'Automating Management Tasks: From Scripts to No-Code Solutions'
description: 'Follow my journey from writing custom scripts to embracing no-code solutions like Postman flows, and discover how automation transformed my daily management responsibilities. This evolution not only saved countless hours but also improved team efficiency, showing how modern automation tools can free managers from repetitive tasks to focus on strategic leadership.'
date: '2025-02-16'
author: Sony Mathew
readingTime: 7
categories: ['Technology And Leadership']
tags:  [ 'No-Code', 'Automation-Tools', 'Productivity-Hacks', 'Tech-Management', 'Postman-Flows', 'Engineering-Management', 'Postman-Collection-Runner', 'Postman-API-Monitoring']
toc: true
---

Here is a brief glimpse of my journey from writing custom scripts to embracing no-code solutions like Postman flows and scheduled collection runner, and discover how automation transformed my daily management responsibilities. This evolution not only saved countless hours but also improved team efficiency, showing how modern automation tools can free managers from repetitive tasks to focus on strategic leadership.

As a manager, I've learned that success often lies not just in making big strategic decisions, but in efficiently handling the numerous small, recurring tasks that fill our daily schedules. Over the years, I've evolved my approach to automation, moving from custom scripts to modern no-code solutions like Postman flows, and I want to share my journey and insights. This blog talks about some practical examples of how automation has transformed my daily management responsibilities.

# The Hidden Time Drain of Recurring Tasks

Every manager knows the drill: weekly SLA reviews, notifying on-call rotations, scanning customer support and feedback tickets, creating tickets from customer feedback, sending regular notifications, sending out surveys or feedback forms during quarterly, half yearly or yearly review cycles, managing team schedules, sending updates to multiple levels of leadership and stakeholders in various forums and forms, setup reminders for various recurring tasks etc. Each task might take only 15-20 minutes, but when you add them up across weeks and months, they consume a significant portion of your productive time. More importantly, these manual interventions introduce delays and potential human errors into processes that could be streamlined.

# My Automation Journey

## Phase 1: Custom Scripts and Servers
Like many technically-inclined managers, I started my automation journey with what I knew best: writing custom scripts. In those early days, I'd spend evenings crafting Ruby, Python, Javascript or plain Bash scripts to handle repetitive tasks, either running them locally or even hosting them on my own servers. This could be simple integrations between different tools or scraping or sending emails etc. While it was gratifying to see my code in action, managing this setup became a job in itself. I found myself spending precious hours maintaining these and the quirks that came with it, debugging unexpected issues, and updating code when APIs changed. The solution worked, but it felt like building a house on shifting sand – effective but requiring constant attention to keep it from crumbling.

## Phase 2: Google Sheets and Apps Script
A breakthrough came when I discovered the power of combining Google Sheets with Apps Script. This revelation changed everything. Instead of managing servers, I could store my data in spreadsheets and write simple scripts that anyone on my team could understand and modify. The beauty of this approach lay in its simplicity – team members could view the data in familiar spreadsheet format, while automation quietly worked in the background. This combination served as a perfect middle ground, offering both visibility and automation without the infrastructure headaches of my previous setup. I could also share this to other managers in the company and they could setup this and get it working in under 5 minutes.


## Phase 3: Modern No-Code Solutions with Postman Flows
Today, my automation strategy has evolved to embrace the power of no-code platforms, particularly Postman flows. This transition feels like stepping into the future – what once required pages of code and hours of maintenance now takes minutes to set up through a visual interface. I can create complex workflows by connecting different services, all without writing a single line of code. The best part? These solutions are often free for most use cases, and when I need to hand over responsibilities or collaborate with team members, they can easily understand and modify the workflows. It's democratized automation in a way I never thought possible during my early days of server management.


I use various out-of-the-box solutions to set up Slack reminders, allowing me to schedule reminders for myself or my team at a channel level for both weekly and non-weekly tasks. This provides a simple and effective way to stay organized.

Similarly, I leverage JIRA’s powerful automation features to create rules that handle repetitive tasks effortlessly. For example, automating the creation of a retrospective sheet when a sprint ends or closing parent tasks once all sub-tasks are completed.

With AI advancing rapidly, the future of automation looks promising. Even before AI agents fully take over, the most reliable and user-friendly automations will likely be those powered by natural language—making setup, validation, and control more intuitive than ever.

# Real-World Applications

Let me share some practical examples of how automation has transformed my daily management responsibilities. These stories might resonate with your own experiences and hopefully inspire some ideas for your automation journey.

## JIRA Notifications on Slack for Reviewers using Google Apps Script

One practical use of this setup was automating reminders for JIRA ticket updates, eliminating the need for manual follow-ups. Every morning at 09:00 AM, the script would notify reviewers to check and review their assigned tickets. In the evening at 06:00 PM, another notification would go out to assignees, reminding them to update their JIRA tasks. This automation ensured that tickets moved forward without delays and significantly reduced the time spent chasing individual team members for updates.

### The Automation Setup
I created a Google Sheet to capture key details:

* A JIRA query (JQL) to fetch tickets pending review.
* A JIRA query to fetch assigned tickets requiring an update.
* A list of team members, including their email addresses and Slack handles.
Using Google Apps Script, I set up a daily scheduled job that runs at:
<img src="/images/posts/automating-management-tasks-from-scripts-to-no-code-solutions/google-sheets-config.png" />

* 09:00 AM – Notifies reviewers about pending tickets.
<img src="/images/posts/automating-management-tasks-from-scripts-to-no-code-solutions/google-app-script.png" />
* 06:00 PM – Reminds assignees to update their JIRA tickets.
<img src="/images/posts/automating-management-tasks-from-scripts-to-no-code-solutions/google-app-script-trigger.png" />

The script reads the Google Sheet, retrieves the relevant JIRA tickets based on JQL queries, maps each ticket to the corresponding team member, and sends notifications via email or Slack. To handle edge cases where tickets are assigned to someone outside the listed team, the script posts an alert in a Slack channel, allowing me to manually reassign the ticket and update the Google Sheet accordingly.


## Bringing Peace to On-Call Rotations with Postman Flows and Scheduled Collection Runner
Managing on-call schedules used to be a constant challenge—team members would forget their shifts, time zone differences led to confusion, and last-minute changes caused unnecessary disruptions. By automating the process, these issues have been virtually eliminated. The system now seamlessly handles rotation updates, sends personalized reminders to on-call engineers, and ensures visibility across the team, making the entire process smooth and hassle-free.

To streamline on-call notifications, I created a Postman collection with three key requests. The first request retrieves the on-call schedule from OpsGenie. The second request identifies which team members are on-call and sends a Slack notification to a public channel at the start of each week, tagging both the primary and secondary on-call engineers. This ensures that the on-call engineers are aware of their responsibilities, while also making it clear to the rest of the team who to reach out to for E2E test failures, customer support tickets, and operational issues. By making on-call assignments visible, this setup helps route queries efficiently and improves operational awareness.

<img src="/images/posts/automating-management-tasks-from-scripts-to-no-code-solutions/opsgenie-collection.png" />

To further simplify the process, I built a Postman Flow, eliminating the need for extensive scripting by allowing me to visually configure the logic for retrieving schedules and sending notifications. 


<img src="/images/posts/automating-management-tasks-from-scripts-to-no-code-solutions/opsgenie-flow.png" />

I then created a monitor that runs every Monday at 09:00 AM, triggering the webhook request within the collection. This webhook, in turn, executes the Postman Flow, fetching the latest OpsGenie schedules and posting an automated notification in Slack.

<img src="/images/posts/automating-management-tasks-from-scripts-to-no-code-solutions/opsgenie-collection-runner.png" />

By automating this workflow, I ensured that on-call responsibilities are clearly communicated each week, reducing manual effort and improving team coordination.


## Making Customer Feedback Work Harder

One of the most business-impactful automations has been streamlining how we handle customer feedback. At Postman, we maintain a public GitHub repository where developers report issues and share feedback. A key responsibility for product and engineering managers is to monitor these tickets regularly.

To organize feedback efficiently, we use a structured tagging system—labeling GitHub issues based on product area and whether they are bugs or general feedback. When incorporating these into our sprints, we convert them into JIRA tickets. While we previously had a centralized automation to bring these into a shared JIRA board, it was discontinued as teams adopted different workflows, timelines, and priorities.

To address this, I built a Postman Flow that automates the process at the team level. It filters GitHub issues by tags and automatically creates corresponding JIRA tickets. Additionally, it tracks the last scanned GitHub issue by issue number, ensuring seamless synchronization moving forward.


<img src="/images/posts/automating-management-tasks-from-scripts-to-no-code-solutions/github-jira-customer-feedback-postman-flow.png" />


# Benefits Beyond Time Savings

While time efficiency is the most obvious benefit, automation has brought several other advantages:

- **Consistency**: Automated processes follow the same steps every time, reducing errors
- **Documentation**: Workflows serve as living documentation of our processes
- **Scalability**: As the team grows, automated processes scale without additional overhead
- **Focus**: Less time on repetitive tasks means more time for strategic work
- **Team Satisfaction**: Reduced manual overhead leads to happier team members

# Tips for Getting Started

If you're looking to start your automation journey:

1. **Start Small**: Pick one recurring task that takes significant time
2. **Document the Process**: Before automating, document each step in detail
3. **Choose the Right Tool**: Modern no-code platforms like Postman flows are often sufficient
4. **Iterate**: Start with basic automation and enhance it based on needs
5. **Share Knowledge**: Document your automations and share with the team and also with others in the team

# Conclusion

The evolution from custom scripts to no-code solutions has revolutionized how managers can handle routine tasks. Tools like Postman flows have made automation accessible to everyone, regardless of technical background. The key is to identify repetitive patterns in your work and gradually automate them, freeing up time for more impactful activities.

Remember, automation isn't about replacing human judgment – it's about enhancing our capability to focus on what truly matters: leading our teams, making strategic decisions, and driving innovation.