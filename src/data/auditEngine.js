function createResult(recommendation, savings, reason, details = {}) {
  return {
    recommendation,
    savings: Math.round(savings * 100) / 100,
    reason,
    ...details,
  }
}

function normalizeText(value) {
  return String(value || '').trim().toLowerCase()
}

export function auditTool(toolEntry, context = {}) {
  const tool = normalizeText(toolEntry.tool)
  const plan = normalizeText(toolEntry.plan)
  const spend = Number(toolEntry.spend) || 0
  const seats = Number(toolEntry.seats) || 0
  const useCase = normalizeText(context.useCase)

  if (plan === 'team' && seats <= 2) {
    return createResult(
      'Downgrade to Plus',
      20,
      'Team pricing carries collaboration overhead that is hard to justify when only one or two seats are active.',
      {
        recommendedPlan: 'Plus',
      },
    )
  }

  if (spend > 500) {
    return createResult(
      'Use Credex credits',
      spend * 0.3,
      'At this spend level, discounted credits can materially reduce recurring infrastructure cost without changing team behavior.',
      {
        recommendedTool: 'Credex credits',
      },
    )
  }

  if (tool === 'chatgpt' && useCase === 'coding') {
    return createResult(
      'Shift coding seats to Cursor or Claude',
      spend * 0.2,
      'For code-heavy workflows, dedicated coding tools usually provide better output per paid seat than general chat subscriptions.',
      {
        recommendedTool: 'Cursor or Claude',
      },
    )
  }

  if (tool === 'cursor' && plan === 'business' && seats < 5) {
    return createResult(
      'Downgrade to Pro',
      spend * 0.5,
      'Business plans make more sense once admin and policy features are being used across a larger engineering group.',
      {
        recommendedPlan: 'Pro',
      },
    )
  }

  if (tool === 'github copilot' && seats > 20 && useCase !== 'coding') {
    return createResult(
      'Reduce Copilot seat scope',
      spend * 0.15,
      'Large Copilot rollouts are often over-allocated when non-engineering teams inherit seats they do not use consistently.',
      {
        recommendedTool: 'GitHub Copilot (smaller seat pool)',
      },
    )
  }

  return createResult(
    'Keep current plan',
    0,
    'This entry does not trigger a clear savings rule, so the current configuration looks reasonable for now.',
  )
}

export function runAudit(tools = [], context = {}) {
  return tools.map((toolEntry) => ({
    ...toolEntry,
    audit: auditTool(toolEntry, context),
  }))
}

export default runAudit
