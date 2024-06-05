# A Nice Way to Find Sums of Powers

## The specific example

Let's start with a specific example, later we will generalise this method.

Solve the following sum:

$$
\sum_{\substack{k=0 \\ k \in \mathbb{N}}}^{n}2^k
$$

We can start by doing this expansion:

$$
\sum_{k=0}^{n}2^k = \sum_{k=0}^{n}1 \cdot 2^k
= 1 \cdot 2^n + 1 \cdot 2^{n-1} + \cdots + 1 \cdot 2^1 + 1 \cdot 2^0
$$

Now we can observe that this forms a number in binary system:

$$
\begin{gather*}
1 \cdot 2^n + 1 \cdot 2^{n-1} + \cdots + 1 \cdot 2^1 + 1 \cdot 2^0
= \underbrace{111 \ldots 111}_{n+1}{}_{(2)} \\
\sum_{k=0}^{n}2^k = \underbrace{111 \ldots 111}_{n+1}{}_{(2)}
\end{gather*}
$$

We can now add $1$ to both sides of equation which gives:

$$
1 + \sum_{k=0}^{n}2^k = 1\underbrace{000 \ldots 000}_{n+1}{}_{(2)}
$$

Converting the binary number to its decimal form:

$$
1 + \sum_{k=0}^{n}2^k = 2^{n+1} \implies
\sum_{k=0}^{n}2^k = 2^{n+1} - 1
$$

## Generalising

Now lets change our sum to base $p$ where $p \in \mathbb{N}$

$$
\sum_{\substack{k=0 \\ k \in \mathbb{N}}}^{n}p^k
$$

The start is identical, but now we multiply by $p - 1$ instead of $1$.

$$
(p - 1)\sum_{k=0}^{n}p^k = (p - 1) \cdot p^n + (p - 1) \cdot p^{n-1} + \cdots + (p - 1) \cdot p^1 + (p - 1) \cdot p^0
$$

This sequence can be substituted for a number in base $p$.

$$
(p - 1)\sum_{k=0}^{n}p^k = \underbrace{\zeta \zeta \zeta \ldots \zeta \zeta \zeta}_{n+1}{}_{(p)}
$$

where $\zeta$ is the biggest digit in base $p$ that is equal to $p - 1$.

Now again adding $1$

$$
1 + (p - 1)\sum_{k=0}^{n}p^k = 1\underbrace{000 \ldots 000}_{n+1}{}_{(p)}
$$

And substituting the number in base $p$ by its value in decimal:

$$
1 + (p - 1)\sum_{k=0}^{n}p^k = p^{n+1} \implies \sum_{k=0}^{n}p^k = \frac{p^{n+1} - 1}{p - 1}
$$
